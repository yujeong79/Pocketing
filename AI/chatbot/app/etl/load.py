# app/ETL/LOAD/load.py

import logging
from typing import List, Dict, Any, Optional
from app.services.vectorstore import VectorStore
from app.models.schemas import PhotoCardVector

logger = logging.getLogger(__name__)


class PhotocardLoader:

    def __init__(self):
        self.vectorstore = VectorStore()
        logger.info("포토카드 로더 초기화 완료")

    def load_vector(self, photocard_vector: PhotoCardVector) -> bool:
        try:
            result = self.vectorstore.add_vector(photocard_vector)
            if result:
                logger.info(f"포토카드 ID {photocard_vector.card_id}의 벡터 저장 성공")
            else:
                logger.error(f"포토카드 ID {photocard_vector.card_id}의 벡터 저장 실패")
            return result
        except Exception as e:
            logger.error(f"포토카드 벡터 저장 중 오류 발생: {str(e)}")
            return False

    def load_vectors(self, photocard_vectors: List[PhotoCardVector]) -> int:
        try:
            if not photocard_vectors:
                logger.warning("저장할 포토카드 벡터가 없음")
                return 0

            saved_count = self.vectorstore.add_vectors(photocard_vectors)

            logger.info(f"총 {saved_count}개의 포토카드 벡터가 성공적으로 저장됨")
            return saved_count
        except Exception as e:
            logger.error(f"포토카드 벡터 일괄 저장 중 오류 발생: {str(e)}")
            return 0

    def load_vectors_in_batches(self, photocard_vectors: List[PhotoCardVector], batch_size: int = 100) -> int:
        try:
            if not photocard_vectors:
                logger.warning("저장할 포토카드 벡터가 없음")
                return 0

            total_vectors = len(photocard_vectors)
            saved_count = 0

            for i in range(0, total_vectors, batch_size):
                batch = photocard_vectors[i:i + batch_size]
                batch_saved = self.vectorstore.add_vectors(batch)
                saved_count += batch_saved

                processed = min(i + batch_size, total_vectors)
                logger.info(f"배치 로드 진행: {processed}/{total_vectors}, 성공: {saved_count}")

            logger.info(f"배치 로드 완료: 총 {total_vectors}개 중 {saved_count}개 성공")
            return saved_count
        except Exception as e:
            logger.error(f"배치 로드 중 오류 발생: {str(e)}")
            return 0

    def update_vector(self, photocard_vector: PhotoCardVector) -> bool:
        try:
            result = self.vectorstore._update_vector(photocard_vector)
            if result:
                logger.info(f"포토카드 ID {photocard_vector.card_id}의 벡터 업데이트 성공")
            else:
                logger.error(f"포토카드 ID {photocard_vector.card_id}의 벡터 업데이트 실패")
            return result
        except Exception as e:
            logger.error(f"포토카드 벡터 업데이트 중 오류 발생: {str(e)}")
            return False

    def delete_vector(self, card_id: int) -> bool:
        try:
            result = self.vectorstore.delete_vector(str(card_id))
            if result:
                logger.info(f"포토카드 ID {card_id}의 벡터 삭제 성공")
            else:
                logger.error(f"포토카드 ID {card_id}의 벡터 삭제 실패")
            return result
        except Exception as e:
            logger.error(f"포토카드 벡터 삭제 중 오류 발생: {str(e)}")
            return False