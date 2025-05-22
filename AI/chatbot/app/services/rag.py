import logging
import json
import hashlib
from typing import List, Dict, Any, Optional, Tuple
from app.services.vectorstore import VectorStore
from app.services.embedding import EmbeddingService
from app.services.cache import RedisCache
from app.services.llm import LLMService
from app.models.schemas import PhotoCardResult, PostInfo
from app.utils.tagging import normalize_tags, split_tag_string
from datetime import datetime

logger = logging.getLogger(__name__)


class RAGService:

    def __init__(self):
        self.vectorstore = VectorStore()
        self.embedding_service = EmbeddingService()
        self.cache = RedisCache()
        self.llm_service = LLMService()
        logger.info("RAG 서비스 초기화 완료")

    def expand_query_semantically(self, query: str) -> str:
        try:
            normalized_query = query.lower().strip()
            cache_key = f"expanded_query:{hashlib.md5(normalized_query.encode()).hexdigest()}"

            cached_result = self.cache.get(cache_key)
            if cached_result:
                logger.info(f"캐시에서 확장된 쿼리 검색됨: '{query}'")
                return cached_result

            system_prompt = """
            당신은 K-POP 포토카드 검색 전문가입니다. 사용자 검색어를 분석하고 확장하여 더 정확한 검색 결과를 얻도록 도와주세요.

            사용자의 질문을 분석하여 다음을 포함한 확장된 검색어를 생성해주세요:
            1. 원래 검색어에 포함된 모든 중요 정보 유지
            2. 사용자가 찾고자 하는 멤버, 그룹, 앨범, 특징 등을 명확히 식별
            3. 관련 동의어 및 유사 개념 추가 (한국어, 영어 모두 고려)
            4. K-POP 포토카드 도메인에 특화된 용어 추가

            중요: 확장된 검색어는 원래 질문의 의도를 보존하면서, 관련성 높은 용어만 추가해야 합니다.
            불필요하게 길지 않고 간결하게 핵심 용어만 포함하세요.

            예시:
            입력: "제니 검은색 의상 포토카드 어디서 살 수 있어?"
            출력: "제니 블랙핑크 블핑 검은색 의상 black outfit 제니 포토카드 판매"

            입력: "에스파 카리나 양갈래 헤어 포토카드 찾아줘"
            출력: "에스파 aespa 카리나 karina 양갈래 양갈래머리 트윈테일 twintails 포토카드 photocard"
            """

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"검색어: {query}"}
            ]

            orig_temperature = self.llm_service.temperature
            self.llm_service.temperature = 0.2

            expanded_query = self.llm_service.generate_response(messages)
            self.llm_service.temperature = orig_temperature
            self.cache.set(cache_key, expanded_query, expiry=86400)

            logger.info(f"쿼리 확장: '{query}' → '{expanded_query}'")
            return expanded_query

        except Exception as e:
            logger.error(f"쿼리 확장 중 오류 발생: {str(e)}")
            return query

    def _analyze_query_with_openai(self, query: str, force_reanalysis: bool = False) -> Dict[str, Any]:
        try:
            normalized_query = query.lower().strip().replace('"', '').replace("'", "")
            cache_key = f"query_analysis:{hashlib.md5(normalized_query.encode()).hexdigest()}"

            if not force_reanalysis:
                cached_result = self.cache.get(cache_key)
                if cached_result:
                    try:
                        result = json.loads(cached_result)
                        logger.info(f"캐시에서 쿼리 분석 결과 로드: {result}")
                        return result
                    except:
                        logger.warning(f"캐시된 쿼리 분석 결과 파싱 실패: {cached_result}")

            system_prompt = """
            당신은 K-POP 포토카드 검색 어시스턴트입니다. 사용자의 검색어를 분석하여 다음 정보를 JSON 형식으로 추출해주세요:

        1. member_name: 멤버 이름 (없으면 null)
        2. group_name: 그룹 이름 (없으면 null)
        3. album_name: 앨범 이름 (없으면 null)
        4. features: 포토카드의 특징들 배열

        중요한 지침:
        - 특징은 개별 단어가 아닌 의미 있는 표현 단위로 추출하세요.
        - 색상, 액세서리, 의상, 헤어스타일, 표정, 포즈 등의 특징을 포함하세요.
        - 한국어 검색어도 올바르게 처리하세요.
        - 명확하지 않은 경우 null 대신 빈 문자열("")이나 빈 배열([])을 반환하세요.
        - 비슷한 용어는 원본 형태와 정규화된 형태를 모두 추출하세요 (예: "단발머리"가 쿼리에 있으면 ["단발머리", "단발"] 모두 특징으로 추출).
        - 색상 용어도 원본 형태를 유지하고 유사어도 추가하세요 (예: "블랙"이 있으면 ["블랙", "검정"] 모두 추출).
        - short hair, bob cut 같은 영어 표현도 특징으로 추출하세요.
        - 쿼리에 영어와 한국어로 같은 의미의 단어가 있다면 둘 다 특징으로 추출하세요.
        - 확장된 쿼리에 있는 모든 관련 용어들을 특징으로 추가하세요.

        예시 분석:
        - 검색어: "핑크 선글라스를 쓴 카리나"
          결과: {"member_name": "카리나", "group_name": "", "album_name": "", "features": ["핑크 선글라스", "핑크", "선글라스", "분홍색"]}

        - 검색어: "에스파 윈터 짧은 머리"
          결과: {"member_name": "윈터", "group_name": "에스파", "album_name": "", "features": ["짧은 머리", "숏컷", "short hair"]}

        - 검색어: "단발머리 short hair 제니"
          결과: {"member_name": "제니", "group_name": "", "album_name": "", "features": ["단발머리", "단발", "short hair"]}

        - 검색어: "블랙핑크 제니 검은색 의상"
          결과: {"member_name": "제니", "group_name": "블랙핑크", "album_name": "", "features": ["검은색 의상", "블랙", "검정", "black outfit"]}
            """

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"검색어: {query}"}
            ]

            orig_temperature = self.llm_service.temperature
            self.llm_service.temperature = 0.2

            response = self.llm_service.generate_response(
                messages,
                response_format={"type": "json_object"}
            )

            self.llm_service.temperature = orig_temperature

            try:
                parsed_response = json.loads(response)

                result = {
                    "member_name": parsed_response.get("member_name") or None,
                    "group_name": parsed_response.get("group_name") or None,
                    "album_name": parsed_response.get("album_name") or None,
                    "features": parsed_response.get("features") or []
                }

                self.cache.set(cache_key, json.dumps(result), expiry=3600)

                logger.info(f"쿼리 분석 결과: {result}")
                return result

            except json.JSONDecodeError:
                logger.error(f"쿼리 분석 응답 JSON 파싱 실패: {response}")
                return {"member_name": None, "group_name": None, "album_name": None, "features": []}

        except Exception as e:
            logger.error(f"OpenAI 쿼리 분석 실패: {str(e)}")
            return {"member_name": None, "group_name": None, "album_name": None, "features": []}


    def _calculate_semantic_similarity_with_openai(self, query_features: List[str], raw_tags: List[str]) -> float:
        if not query_features or not raw_tags:
            return 0.0
        try:
            normalized_tags = raw_tags

            features_key = ",".join(sorted(f.lower() for f in query_features))
            tags_key = ",".join(sorted(t.lower() for t in normalized_tags))
            cache_key = f"similarity:{features_key}:{tags_key}"

            cached_result = self.cache.get(cache_key)
            if cached_result:
                try:
                    return float(cached_result)
                except:
                    logger.warning(f"캐시된 유사도 값 파싱 실패: {cached_result}")

            system_prompt = """
            당신은 K-POP 포토카드 특징과 태그 간의 의미적 유사도를 판단하는 전문가입니다.
            사용자가 찾는 특징과 포토카드 태그 사이의 유사도를 0.0에서 1.0 사이 값으로 평가해주세요.

            중요한 고려사항:
            1. 단어의 동의어와 유사한 개념을 고려하세요. 예를 들어:
               - "단발"과 "단발머리"는 동일한 개념입니다 (유사도 1.0)
               - "숏컷"과 "짧은 머리"는 매우 유사합니다 (유사도 0.9)
               - "블랙"과 "검정색"은 동일한 색상입니다 (유사도 1.0)
               - "핑크"와 "분홍색"은 동일한 색상입니다 (유사도 1.0)

            2. 포함 관계도 높은 유사도를 갖습니다:
               - "하트 포즈"가 검색어이고 태그가 "하트"인 경우 높은 유사도를 갖습니다 (0.8)
               - "분홍색 의상"이 검색어이고 태그가 "핑크 드레스"인 경우 높은 유사도를 갖습니다 (0.8)

            3. 문화적 맥락도 고려하세요:
               - "애교"와 "귀여운 표정"은 K-POP 문화에서 유사한 개념입니다 (0.7)
               - "Y2K"와 "레트로"는 스타일적으로 관련이 있습니다 (0.6)

            특히 헤어스타일, 패션, 액세서리, 포즈, 표정 등과 관련된 용어의 유사성에 주의하세요.

            높은 유사도 예시 (0.7~1.0):
            - 특징: "단발머리", 태그: ["단발", "숏컷"] -> 유사도 1.0
            - 특징: "레드 립", 태그: ["빨간 립스틱", "빨간 입술"] -> 유사도 0.9
            - 특징: "뱅헤어", 태그: ["앞머리", "프린지"] -> 유사도 0.8

            중간 유사도 예시 (0.3~0.6):
            - 특징: "블루 드레스", 태그: ["파란색", "드레스"] -> 유사도 0.6
            - 특징: "큰 안경", 태그: ["안경", "선글라스"] -> 유사도 0.4

            낮은 유사도 예시 (0.0~0.2):
            - 특징: "검은색 모자", 태그: ["핑크 드레스", "긴 머리"] -> 유사도 0.0
            - 특징: "윙크", 태그: ["공식 포토카드", "콘서트"] -> 유사도 0.0

            최종 결과는 반드시 JSON 형식으로 {"similarity": 0.0~1.0} 형태로 반환해주세요.
            """

            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"사용자 특징: {query_features}\n정규화된 태그: {normalized_tags}"}
            ]

            orig_temperature = self.llm_service.temperature
            self.llm_service.temperature = 0.1

            response = self.llm_service.generate_response(
                messages,
                response_format={"type": "json_object"}
            )

            self.llm_service.temperature = orig_temperature

            try:
                parsed_response = json.loads(response)
                similarity = parsed_response.get("similarity", 0.0)

                if not isinstance(similarity, (int, float)) or similarity < 0 or similarity > 1:
                    logger.warning(f"유효하지 않은 유사도 값: {similarity}, 기본값 0.0 사용")
                    similarity = 0.0

                self.cache.set(cache_key, str(similarity), expiry=1800)

                logger.debug(f"특징: {query_features}, 태그: {normalized_tags}, 유사도: {similarity}")
                return float(similarity)

            except json.JSONDecodeError:
                logger.error(f"유사도 응답 JSON 파싱 실패: {response}")
                return 0.0

        except Exception as e:
            logger.error(f"의미 유사도 계산 실패: {str(e)}")
            return 0.0

    def search_photocards(self, query: str, n_results: int = 20, filters: Optional[Dict[str, Any]] = None) -> Tuple[List[Dict[str, Any]], List[PhotoCardResult]]:
        try:
            query_analysis = self._analyze_query_with_openai(query, force_reanalysis=True)
            member_name = query_analysis.get('member_name')
            group_name = query_analysis.get('group_name')
            album_name = query_analysis.get('album_name')
            features = query_analysis.get('features', [])

            logger.info(f"쿼리 분석 결과: 멤버={member_name}, 그룹={group_name}, 앨범={album_name}, 특징={features}")

            exact_filters = {}
            if member_name:
                exact_filters["member_name"] = member_name
            if group_name:
                exact_filters["group_name"] = group_name
            if album_name:
                exact_filters["album_name"] = album_name

            search_results = []

            if member_name or group_name or album_name or features:
                logger.info("단계 1: 정확한 필터 검색 수행")

                query_with_features = query
                if features:
                    query_with_features += " " + " ".join(features)

                query_embedding = self.embedding_service.get_text_embedding(query_with_features)
                if not query_embedding:
                    logger.error("쿼리 임베딩 생성 실패")
                    return [], []

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results * 2,
                    filters=exact_filters if exact_filters else None
                )

                logger.info(f"단계 1 검색 결과: {len(search_results)}개")

            if not search_results and (member_name or group_name):
                logger.info("단계 2: 부분 필터 검색 수행")

                partial_filters = {}
                if member_name:
                    partial_filters["member_name"] = member_name
                elif group_name:
                    partial_filters["group_name"] = group_name

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results * 2,
                    filters=partial_filters if partial_filters else None
                )

                logger.info(f"단계 2 검색 결과: {len(search_results)}개")

            if not search_results and features:
                logger.info("단계 3: 필터 없이 검색 수행")

                search_results = self.vectorstore.search(
                    query_embedding,
                    n_results=n_results * 2
                )

                logger.info(f"단계 3 검색 결과: {len(search_results)}개")

            if not search_results:
                logger.warning("모든 검색 단계 후에도 결과 없음")
                return [], []

            if features and search_results:
                logger.info("LLM을 사용한 유사도 기반 필터링 시작")
                scored_results = []

                for result in search_results:
                    tag_str = result["metadata"].get("tag", "")
                    raw_tags = split_tag_string(tag_str)

                    logger.debug(f"카드 ID: {result['metadata'].get('card_id')}, 원본 태그: {tag_str}, 분할 태그: {raw_tags}")

                    if not raw_tags:
                        logger.debug(f"카드 ID: {result['metadata'].get('card_id')}에 태그가 없어 낮은 유사도 부여")
                        result["semantic_similarity"] = 0.0
                        scored_results.append((result, 0.0))
                        continue

                    similarity_score = self._calculate_semantic_similarity_with_openai(features, raw_tags)

                    result["semantic_similarity"] = similarity_score
                    scored_results.append((result, similarity_score))

                    logger.debug(f"카드 ID: {result['metadata'].get('card_id')}, 유사도: {similarity_score}, 태그: {raw_tags}")

                scored_results.sort(key=lambda x: x[1], reverse=True)

                threshold = 0.5
                filtered_results = [result for result, score in scored_results if score >= threshold]

                if not filtered_results and scored_results:
                    tagged_results = [(result, score) for result, score in scored_results
                                      if split_tag_string(result["metadata"].get("tag", "")) and score > 0.0]

                    if tagged_results:

                        top_n = min(3, len(tagged_results))
                        filtered_results = [result for result, _ in tagged_results[:top_n]]
                        logger.info(f"필터링 임계값을 만족하는 결과가 없어 태그가 있는 상위 {len(filtered_results)}개 결과 반환")

                search_results = filtered_results
                logger.info(f"유사도 필터링 후 결과: {len(search_results)}개")

            max_results = min(n_results, len(search_results))
            final_results = search_results[:max_results]

            metadata_list = []
            card_ids = []

            for result in final_results:
                card_id = int(result["metadata"]["card_id"])
                card_ids.append(card_id)

                similarity_score = result.get("semantic_similarity", 0.0)

                metadata_item = {
                    "card_id": card_id,
                    "card_image_url": result["metadata"]["card_image_url"],
                    "member_id": int(result["metadata"]["member_id"]),
                    "album_id": int(result["metadata"]["album_id"]),
                    "group_id": int(result["metadata"]["group_id"]),
                    "member_name": result["metadata"]["member_name"],
                    "group_name": result["metadata"]["group_name"],
                    "album_name": result["metadata"]["album_name"],
                    "tag": split_tag_string(result["metadata"].get("tag", "")),
                    "distance": result["distance"],
                    "semantic_similarity": similarity_score
                }
                metadata_list.append(metadata_item)

            group_name_for_cache = metadata_list[0]["group_name"] if metadata_list else None

            cheapest_posts_dict = self.cache.get_cheapest_posts_by_card_ids(card_ids, group_name=group_name_for_cache)

            post_results = []
            for metadata in metadata_list:
                card_id = metadata["card_id"]

                if card_id in cheapest_posts_dict:
                    post_results.append(cheapest_posts_dict[card_id])
                else:
                    logger.info(f"포토카드 ID {card_id}의 판매글 정보 없음, 포토카드 이미지로 대체")

                    post_info = PostInfo(
                        post_id=None,
                        price=None,
                        post_image_url=None,
                        card_image_url=metadata["card_image_url"],
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

    def rag_photocard_for_llm(self, metadata_list: List[Dict[str, Any]], post_results: List[PhotoCardResult]) -> str:
        try:
            return self._format_photocard_results(metadata_list, post_results)
        except Exception as e:
            logger.error(f"포토카드 정보 포맷팅 중 오류 발생: {str(e)}")
            return "포토카드 정보를 포맷팅하는 중에 오류가 발생했습니다."

    def _format_photocard_results(self, metadata_list: List[Dict[str, Any]],
                                  post_results: List[PhotoCardResult]) -> str:
        if not metadata_list:
            return "검색 결과가 없습니다."

        result_map = {}
        for metadata in metadata_list:
            result_map[metadata["card_id"]] = {
                "card_info": metadata,
                "post_info": None,
                "similarity": metadata.get("semantic_similarity", 0)  # 의미적 유사도 점수
            }

        for post_result in post_results:
            if post_result.card_id in result_map:
                result_map[post_result.card_id]["post_info"] = post_result

        formatted_info = []
        formatted_info.append(f"총 {len(metadata_list)}개의 포토카드를 찾았습니다.")

        sorted_results = sorted(result_map.items(), key=lambda x: x[1]["similarity"], reverse=True)

        for i, (card_id, data) in enumerate(sorted_results):
            card_info = data["card_info"]
            post_info = data["post_info"]
            similarity = data["similarity"]

            card_text = (
                f"포토카드 {i + 1}:\n"
                f"- 그룹: {card_info['group_name']}\n"
                f"- 멤버: {card_info['member_name']}\n"
                f"- 앨범: {card_info['album_name']}\n"
                f"- 태그: {', '.join(card_info['tag'])}\n"
                f"- 유사도: {similarity:.2f}\n"
            )

            if post_info and post_info.cheapest_post and post_info.cheapest_post.post_id:
                card_text += (
                    f"- 최저가: {post_info.cheapest_post.price}원\n"
                    f"- 판매자: {post_info.cheapest_post.nickname}\n"
                )
            else:
                card_text += "- 현재 판매 중인 포토카드가 없습니다.\n"

            formatted_info.append(card_text)

        return "\n".join(formatted_info)