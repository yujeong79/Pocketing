import logging
from typing import Optional, List, Dict, Any, Union
import chromadb
from chromadb.config import Settings as ChromadbSettings
from app.config.settings import settings
from app.models.schemas import PhotoCardVector

logger = logging.getLogger(__name__)


class VectorStore:
    def __init__(self):
        try:
            self.client = chromadb.HttpClient(
                host=settings.CHROMA_HOST,
                port=settings.CHROMA_PORT,
                settings=ChromadbSettings(
                    persist_directory=settings.CHROMA_DB_PATH,
                    anonymized_telemetry=False
                )
            )

            self.collection = self._get_or_create_collection("photocard_db")
            logger.info(f"벡터스토어 컬렉션 생성 완료")
        except Exception as e:
            logger.error(f"벡터스토어 컬렉션 생성 실패 : {str(e)}")
            raise

    def _get_or_create_collection(self, collection_name: str):
        try:
            return self.client.get_collection(collection_name)
        except Exception as e:
            logger.info(f"컬렉션 '{collection_name}' 생성중..")
            return self.client.create_collection(
                name=collection_name,
                metadata={"description": "포토카드 벡터 저장소"}
            )

    def add_vector(self, photocard: PhotoCardVector) -> bool:  # 포토카드 한장 저장
        try:
            metadata = {
                "card_id": str(photocard.card_id),
                "card_image_url": photocard.card_image_url,
                "member_id": str(photocard.member_id),
                "album_id": str(photocard.album_id),
                "group_id": str(photocard.group_id),
                "member_name": photocard.member_name,
                "group_name": photocard.group_name,
                "album_name": photocard.album_name,
                "tag": ",".join(photocard.tag)
            }
            self.collection.add(
                ids=[str(photocard.card_id)],
                embeddings=[photocard.embedding],
                metadatas=[metadata]
            )
            logger.info(f"포토카드 벡터 추가 완료:card_id={photocard.card_id}")
            return True
        except Exception as e:
            logger.error(f"포토카드 벡터 추가 실패:{str(e)}")
            return False

    def add_vectors(self, photocards: List[PhotoCardVector]) -> int:  # 포토카드 여러장 저장
        if not photocards:
            return 0
        try:
            ids = []
            embeddings = []
            metadatas = []

            for card in photocards:
                ids.append(str(card.card_id))
                embeddings.append(card.embedding)

                metadata = {
                    "card_id": str(card.card_id),
                    "card_image_url": card.card_image_url,
                    "member_id": str(card.member_id),
                    "album_id": str(card.album_id),
                    "group_id": str(card.group_id),
                    "member_name": card.member_name,
                    "group_name": card.group_name,
                    "album_name": card.album_name,
                    "tag": ",".join(card.tag)
                }
                metadatas.append(metadata)

            self.collection.add(
                ids=ids,
                embeddings=embeddings,
                metadatas=metadatas
            )

            logger.info(f"{len(photocards)}개 포토카드 일괄 벡터 저장 완료")
            return len(photocards)
        except Exception as e:
            logger.error(f"포토카드 일괄 벡터 저장 실패:{str(e)}")
            return 0

    def search(self,
               query_vectors: Union[List[float], List[List[float]]],
               n_results: int = 5,
               filters: Optional[Dict[str, Any]] = None) -> List[List[Dict[str, Any]]]:

        try:
            if isinstance(query_vectors[0], float):
                query_vectors = [query_vectors]
                single_query = True
            else:
                single_query = False

            where_filter = None
            if filters:
                if len(filters) > 1:
                    where_clauses = []
                    for key, value in filters.items():
                        where_clauses.append({key: {"$eq": value}})
                    where_filter = {"$or": where_clauses}
                elif len(filters) == 1:
                    key, value = next(iter(filters.items()))
                    where_filter = {key: {"$eq": value}}

            results = self.collection.query(
                query_embeddings=query_vectors,
                n_results=n_results,
                where=where_filter
            )

            all_searched_results = []

            for query_idx in range(len(results["ids"])):
                searched_results = []
                if results["ids"][query_idx]:
                    for i in range(len(results["ids"][query_idx])):
                        result = {
                            "id": results["ids"][query_idx][i],
                            "metadata": results["metadatas"][query_idx][i],
                            "distance": results["distances"][query_idx][i] if "distances" in results else None
                        }
                        searched_results.append(result)
                all_searched_results.append(searched_results)

            if single_query:
                logger.info(f"벡터 검색 완료: {len(all_searched_results[0])}개 결과 반환")
                return all_searched_results[0]
            else:
                total_results = sum(len(results) for results in all_searched_results)
                logger.info(f"다중 벡터 검색 완료: {len(query_vectors)}개 쿼리, 총 {total_results}개 결과 반환")
                return all_searched_results

        except Exception as e:
            logger.error(f"벡터 검색 실패: {str(e)}")
            if single_query:
                return []
            else:
                return [[] for _ in range(len(query_vectors))]

    def delete_vector(self, card_id: str) -> bool:
        try:
            self.collection.delete(ids=[card_id])
            logger.info(f"card_id = {card_id}의 포토카드 벡터 삭제 완료")
            return True
        except Exception as e:
            logger.error(f"포토카드 벡터 삭제 실패:{str(e)}")
            return False

    def _update_vector(self, photocard: PhotoCardVector) -> bool:
        try:
            self.delete_vector(photocard.card_id)
            return self.add_vector(photocard)
        except Exception as e:
            logger.error(f"포토카드 업데이트 실패:{str(e)}")
            return False

    def _get_vector_count(self) -> int:
        try:
            count = self.collection.count()
            logger.info(f"현재 저장된 벡터 수: {count}")
            return count
        except Exception as e:
            logger.error(f"벡터 수 조회 실패:{str(e)}")
            return 0

    def get_vector(self, card_id: str) -> Optional[Dict[str, Any]]:
        try:
            result = self.collection.get(ids=[card_id])
            if result and result.get("ids") and len(result["ids"]) > 0:
                return {
                    "id": result["ids"][0],
                    "metadata": result["metadatas"][0],
                    "embedding": result["embeddings"][0] if "embeddings" in result else None
                }
            return None
        except Exception as e:
            logger.error(f"포토카드 벡터 조회 실패: {str(e)}")
            return None

    def _reset(self) -> bool:
        try:
            self.client.delete_colletion("photocard_db")
            self.collection = self._get_or_create_collection("photocard_db")
            logger.warning("벡터 저장소가 초기화됨")
            return True
        except Exception as e:
            logger.error(f"벡터 저장소 초기화 실패:{str(e)}")
            return False