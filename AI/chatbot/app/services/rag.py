import logging
import json
from datetime import datetime
from typing import List, Dict, Any, Optional, Tuple
from app.services.vectorstore import VectorStore
from app.services.embedding import EmbeddingService
from app.services.cache import RedisCache
from app.services.llm import LLMService
from app.models.schemas import PhotoCardResult, PostInfo

logger = logging.getLogger(__name__)


class RAGService:

    def __init__(self):
        self.vectorstore = VectorStore()
        self.embedding_service = EmbeddingService()
        self.cache = RedisCache()
        self.llm_service = LLMService()
        logger.info("RAG 서비스 초기화 완료")

    def _analyze_query_with_openai(self, query: str) -> Dict[str, Any]:
        try:
            system_prompt = """
            당신은 K-POP 포토카드 검색 어시스턴트입니다. 사용자의 검색어를 분석하여 다음 정보를 JSON 형식으로 추출해주세요:
            1. member_name: 멤버 이름 (없으면 null)
            2. group_name: 그룹 이름 (없으면 null)
            3. album_name: 앨범 이름 (없으면 null)
            4. features: 포토카드의 특징들 (헤어스타일, 색상, 의상, 표정 등) 배열

            예시 출력:
            {
                "member_name": "윈터", 
                "group_name": "에스파",
                "album_name": null,
                "features": ["양갈래", "빨간옷", "미소짓는"]
            }
            """

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"검색어: {query}"}
            ]

            response = self.llm_service.generate_response(messages, response_format={"type": "json_object"})
            parsed_response = json.loads(response)

            logger.info(f"OpenAI 쿼리 분석 결과: {parsed_response}")
            return parsed_response

        except Exception as e:
            logger.error(f"OpenAI 쿼리 분석 실패: {str(e)}")
            return {"member_name": None, "group_name": None, "album_name": None, "features": []}

    def _calculate_semantic_similarity_with_openai(self, query_features: List[str], card_tags: List[str]) -> float:
        if not query_features or not card_tags:
            return 0.0

        try:
            system_prompt = """
            당신은 K-POP 포토카드 특징과 태그 간의 의미적 유사도를 판단하는 어시스턴트입니다. 
            사용자가 찾는 특징과 포토카드에 태깅된 특징 간의 유사도를 0.0에서 1.0 사이의 숫자로 평가해주세요.

            예시:
            - 사용자 특징 ["노란옷"], 태그 ["yellow", "노랭이"] -> 0.9 (매우 유사)
            - 사용자 특징 ["양갈래"], 태그 ["포니테일"] -> 0.4 (부분 유사)
            - 사용자 특징 ["웃는"], 태그 ["화난"] -> 0.0 (유사하지 않음)

            최종 결과는 JSON 형식으로 {"similarity": 0.0~1.0} 형태로 반환해주세요.
            """

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"사용자 특징: {query_features}\n태그: {card_tags}"}
            ]

            response = self.llm_service.generate_response(messages, response_format={"type": "json_object"})
            parsed_response = json.loads(response)

            similarity = parsed_response.get("similarity", 0.0)
            return float(similarity)

        except Exception as e:
            logger.error(f"의미 유사도 계산 실패: {str(e)}")
            return 0.0

    def search_photocards(self,
                          query: str,
                          n_results: int = 20,
                          filters: Optional[Dict[str, Any]] = None) -> Tuple[
        List[Dict[str, Any]], List[PhotoCardResult]]:
        try:
            query_analysis = self._analyze_query_with_openai(query)
            member_name = query_analysis.get('member_name')
            group_name = query_analysis.get('group_name')
            album_name = query_analysis.get('album_name')
            features = query_analysis.get('features', [])

            logger.info(f"쿼리 분석 결과: 멤버={member_name}, 그룹={group_name}, 앨범={album_name}, 특징={features}")

            search_results = []

            if member_name or group_name or features:
                logger.info("단계 1: 정확한 필터 검색 수행")
                exact_filters = {}

                if member_name:
                    exact_filters["member_name"] = member_name
                if group_name:
                    exact_filters["group_name"] = group_name

                query_with_features = query
                if features:
                    query_with_features += " " + " ".join(features)

                query_embedding = self.embedding_service.get_text_embedding(query_with_features)
                if not query_embedding:
                    logger.error("쿼리 임베딩 생성 실패")
                    return [], []

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results,
                    filters=exact_filters
                )

                if features and search_results:
                    filtered_results = []
                    for result in search_results:
                        tags = result["metadata"].get("tag", "").split(",") if result["metadata"].get("tag") else []
                        tags = [tag.strip() for tag in tags if tag.strip()]

                        features_match = True
                        for feature in features:
                            feature_found = False
                            for tag in tags:
                                if feature.lower() in tag.lower() or tag.lower() in feature.lower():
                                    feature_found = True
                                    break
                            if not feature_found:
                                features_match = False
                                break

                        if features_match:
                            filtered_results.append(result)

                    search_results = filtered_results

                if search_results:
                    logger.info(f"단계 1에서 {len(search_results)}개 결과 발견")

            if not search_results and (member_name or group_name) and features:
                logger.info("단계 2: 부분 필터 검색 수행 (일부 특징만 매칭)")
                partial_filters = {}

                if member_name:
                    partial_filters["member_name"] = member_name
                if group_name:
                    partial_filters["group_name"] = group_name

                query_embedding = self.embedding_service.get_text_embedding(query_with_features)

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results,
                    filters=partial_filters
                )

                if features and search_results:
                    filtered_results = []
                    for result in search_results:
                        tags = result["metadata"].get("tag", "").split(",") if result["metadata"].get("tag") else []
                        tags = [tag.strip() for tag in tags if tag.strip()]

                        feature_match_count = 0
                        for feature in features:
                            for tag in tags:
                                if feature.lower() in tag.lower() or tag.lower() in feature.lower():
                                    feature_match_count += 1
                                    break

                        if feature_match_count > 0:
                            match_ratio = feature_match_count / len(features)
                            result["feature_match_score"] = match_ratio
                            filtered_results.append(result)

                    filtered_results.sort(key=lambda x: x.get("feature_match_score", 0), reverse=True)
                    search_results = filtered_results

                if search_results:
                    logger.info(f"단계 2에서 {len(search_results)}개 결과 발견")

            if not search_results and features:
                logger.info("단계 3: 의미 유사도 검색 수행")
                semantic_filters = {}

                if member_name:
                    semantic_filters["member_name"] = member_name
                if group_name:
                    semantic_filters["group_name"] = group_name

                enhanced_query = query
                if features:
                    enhanced_query += " " + " ".join(features)

                query_embedding = self.embedding_service.get_text_embedding(enhanced_query)

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results,
                    filters=semantic_filters
                )

                if features and search_results:
                    scored_results = []
                    for result in search_results:
                        tags = result["metadata"].get("tag", "").split(",") if result["metadata"].get("tag") else []
                        tags = [tag.strip() for tag in tags if tag.strip()]

                        semantic_similarity = self._calculate_semantic_similarity_with_openai(features, tags)
                        result["semantic_similarity"] = semantic_similarity
                        scored_results.append((result, semantic_similarity))

                    scored_results.sort(key=lambda x: x[1], reverse=True)

                    filtered_results = [result for result, score in scored_results if score >= threshold]

                    if not filtered_results and scored_results:
                        top_n = min(3, len(scored_results))
                        filtered_results = [result for result, _ in scored_results[:top_n]]

                    search_results = filtered_results

                if search_results:
                    logger.info(f"단계 3에서 {len(search_results)}개 결과 발견")

            if not search_results:
                logger.info("단계 4: 기본 벡터 검색 수행")
                basic_filters = {}

                if member_name:
                    basic_filters["member_name"] = member_name
                elif group_name:
                    basic_filters["group_name"] = group_name

                query_embedding = self.embedding_service.get_text_embedding(query)

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results,
                    filters=basic_filters if basic_filters else None
                )

                if not search_results and (member_name or group_name):
                    logger.info("필터 없이 최종 검색 수행")
                    search_results = self.vectorstore.search(
                        query_embedding,
                        n_results=n_results
                    )

                if search_results:
                    logger.info(f"단계 4에서 {len(search_results)}개 결과 발견")

            if not search_results:
                logger.warning("모든 검색 단계 후에도 결과 없음")
                return [], []

            max_results = min(5, len(search_results))
            final_results = search_results[:max_results]

            card_ids = [int(result["metadata"]["card_id"]) for result in final_results]
            group_names = [result["metadata"].get("group_name") for result in final_results]
            group_name_for_cache = group_names[0] if group_names else None

            cheapest_posts_dict = self.cache.get_cheapest_posts_by_card_ids(card_ids, group_name=group_name_for_cache)

            metadata_list = []
            post_results = []

            for result in final_results:
                card_id = int(result["metadata"]["card_id"])

                similarity_score = result.get("semantic_similarity",
                                              result.get("feature_match_score", 0.0))

                metadata_item = {
                    "card_id": card_id,
                    "card_image_url": result["metadata"]["card_image_url"],
                    "member_id": int(result["metadata"]["member_id"]),
                    "album_id": int(result["metadata"]["album_id"]),
                    "group_id": int(result["metadata"]["group_id"]),
                    "member_name": result["metadata"]["member_name"],
                    "group_name": result["metadata"]["group_name"],
                    "album_name": result["metadata"]["album_name"],
                    "tag": result["metadata"]["tag"].split(",") if result["metadata"]["tag"] else [],
                    "distance": result["distance"],
                    "semantic_similarity": similarity_score
                }
                metadata_list.append(metadata_item)

                if card_id in cheapest_posts_dict:
                    post_results.append(cheapest_posts_dict[card_id])
                else:
                    logger.info(f"포토카드 ID {card_id}의 판매글 정보 없음, 포토카드 이미지로 대체")
                    # 여기가 수정 필요한 부분입니다 - 판매글이 없는 경우
                    post_info = PostInfo(
                        post_id=None,
                        price=None,
                        post_image_url=None,  # 판매자가 없으므로 post_image_url은 null
                        card_image_url=result["metadata"]["card_image_url"],  # 카드 이미지 URL 설정
                        nickname="판매자 없음",
                        last_updated=datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
                    )
                    empty_result = PhotoCardResult(
                        card_id=card_id,
                        cheapest_post=post_info
                    )
                    post_results.append(empty_result)

            logger.info(f"최종 검색 결과: {len(metadata_list)}개 포토카드, {len(post_results)}개 판매글 정보")
            return metadata_list, post_results

        except Exception as e:
            logger.error(f"포토카드 검색 중 오류 발생: {str(e)}")
            return [], []

    def _format_photocard_results(self, metadata_list: List[Dict[str, Any]],
                                  post_results: List[PhotoCardResult]) -> str:
        if not metadata_list:
            return "검색 결과가 없습니다."

        result_map = {}
        for metadata in metadata_list:
            result_map[metadata["card_id"]] = {
                "card_info": metadata,
                "post_info": None,
                "similarity": metadata.get("semantic_similarity", 0)
            }


        for post_result in post_results:
            if post_result.card_id in result_map:
                result_map[post_result.card_id]["post_info"] = post_result
                logger.debug(f"포토카드 ID {post_result.card_id}의 판매글 정보: {post_result}")

        formatted_info = []
        formatted_info.append(f"총 {len(metadata_list)}개의 포토카드를 찾았습니다.")

        sorted_results = sorted(result_map.items(), key=lambda x: x[1]["similarity"], reverse=True)
        has_sales_posts = False

        for i, (card_id, data) in enumerate(sorted_results):
            card_info = data["card_info"]
            post_info = data["post_info"]
            similarity = data["similarity"]

            card_text = (
                f"포토카드 {i + 1}:\n"
                f"- 그룹: {card_info['group_name']}\n"
                f"- 멤버: {card_info['member_name']}\n"
                f"- 앨범: {card_info['album_name']}\n"
                f"- 태그: {', '.join(card_info['tag']) if card_info['tag'] else '태그 없음'}\n"
                f"- 유사도: {similarity:.2f}\n"
            )

            if post_info:
                logger.info(
                    f"포맷팅: 포토카드 ID {card_id}, post_id={post_info.cheapest_post.post_id}, price={post_info.cheapest_post.price}")
                if post_info.cheapest_post and post_info.cheapest_post.post_id is not None and post_info.cheapest_post.post_id != 0:
                    has_sales_posts = True
                    card_text += (
                        f"- 최저가: {post_info.cheapest_post.price}원\n"
                        f"- 판매자: {post_info.cheapest_post.nickname}\n"
                    )
                else:
                    card_text += "- 현재 판매 중인 포토카드가 없습니다.\n"

            formatted_info.append(card_text)

        if has_sales_posts:
            formatted_info.insert(1, "일부 포토카드는 현재 판매 중입니다. 가격 정보를 확인하세요.")
        else:
            formatted_info.insert(1, "현재 판매 중인 포토카드가 없습니다.")

        return "\n".join(formatted_info)

    def rag_photocard_for_llm(self, metadata_list: List[Dict[str, Any]], post_results: List[PhotoCardResult]) -> str:
        try:
            return self._format_photocard_results(metadata_list, post_results)
        except Exception as e:
            logger.error(f"포토카드 정보 포맷팅 중 오류 발생: {str(e)}")
            return "포토카드 정보를 포맷팅하는 중에 오류가 발생했습니다."