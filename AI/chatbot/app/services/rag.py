import logging
from typing import List, Dict, Any, Optional, Tuple
from app.services.vectorstore import VectorStore
from app.services.embedding import EmbeddingService
from app.services.cache import RedisCache
from app.models.schemas import PhotoCardResult

logger = logging.getLogger(__name__)


class RAGService:

    def __init__(self):
        self.vectorstore = VectorStore()
        self.embedding_service = EmbeddingService()
        self.cache = RedisCache()
        logger.info("RAG 서비스 초기화 완료")

    def search_photocards(self,
                          query: str,
                          n_results: int = 5,
                          filters: Optional[Dict[str, Any]] = None) -> Tuple[
        List[Dict[str, Any]], List[PhotoCardResult]]:

        try:
            query_embedding = self.embedding_service.get_text_embedding(query)
            if not query_embedding:
                logger.error("쿼리 임베딩 생성 실패")
                return [], []

            search_results = self.vectorstore.search(query_embedding, n_results=n_results, filters=filters)
            if not search_results:
                logger.info("검색 결과 없음")
                return [], []

            card_ids = [int(result["metadata"]["card_id"]) for result in search_results]
            group_names = [result["metadata"].get("group_name") for result in search_results]
            group_name = group_names[0] if group_names else None

            cheapest_posts_dict = self.cache.get_cheapest_posts_by_card_ids(card_ids, group_name=group_name)

            metadata_list = []
            post_results = []

            for result in search_results:
                card_id = int(result["metadata"]["card_id"])
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
                    "distance": result["distance"]
                }
                metadata_list.append(metadata_item)

                if card_id in cheapest_posts_dict:
                    post_results.append(cheapest_posts_dict[card_id])

            logger.info(f"포토카드 검색 완료: {len(metadata_list)}개 포토카드, {len(post_results)}개 판매글 정보")
            return metadata_list, post_results

        except Exception as e:
            logger.error(f"포토카드 검색 중 오류 발생: {str(e)}")
            return [], []

    def rag_photocard_for_llm(self,
                                 metadata_list: List[Dict[str, Any]],
                                 post_results: List[PhotoCardResult]) -> str:
        try:
            if not metadata_list:
                return "검색 결과가 없습니다."

            result_map = {}
            for metadata in metadata_list:
                result_map[metadata["card_id"]] = {
                    "card_info": metadata,
                    "post_info": None
                }

            for post_result in post_results:
                if post_result.card_id in result_map:
                    result_map[post_result.card_id]["post_info"] = post_result

            formatted_info = []
            formatted_info.append(f"총 {len(metadata_list)}개의 포토카드를 찾았습니다.")

            for card_id, data in result_map.items():
                card_info = data["card_info"]
                post_info = data["post_info"]

                card_text = (
                    f"포토카드 {len(formatted_info)}:\n"
                    f"- 그룹: {card_info['group_name']}\n"
                    f"- 멤버: {card_info['member_name']}\n"
                    f"- 앨범: {card_info['album_name']}\n"
                )

                if post_info and post_info.cheapest_post.post_id:
                    card_text += (
                        f"- 최저가: {post_info.cheapest_post.price}원\n"
                        f"- 판매자: {post_info.cheapest_post.nickname}\n"
                    )
                else:
                    card_text += "- 현재 판매 중인 포토카드가 없습니다.\n"

                formatted_info.append(card_text)

            return "\n".join(formatted_info)

        except Exception as e:
            logger.error(f"포토카드 정보 포맷팅 중 오류 발생: {str(e)}")
            return "포토카드 정보를 포맷팅하는 중에 오류가 발생했습니다."