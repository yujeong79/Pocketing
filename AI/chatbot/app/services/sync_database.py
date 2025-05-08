import logging

from app.etl.extract import PhotocardExtractor
from app.etl.load import PhotocardLoader
from app.etl.transform import PhotocardTransformer

logger = logging.getLogger(__name__)

class SyncDatabase:
    def __init__(self):
        self.extractor = PhotocardExtractor
        self.transformer = PhotocardTransformer()
        self.loader = PhotocardLoader()

    def sync_missing_photocard(self, batch_size: int = 100) -> int:
        try:
            logger.info("임베딩이 없는 포토카드 데이터 동기화 시작")

            logger.info("임베딩이 없는 포토카드 데이터 추출 중...")
            photocards = self.extractor.extract_photocards_without_embeddings(batch_size=batch_size)
            if not photocards:
                logger.info("임베딩이 없는 포토카드가 없음")
                return 0
            logger.info(f"총 {len(photocards)}개의 임베딩이 없는 포토카드 데이터 추출 완료")

            logger.info("포토카드 데이터를 벡터로 변환 중...")
            vectors = self.transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
            if not vectors:
                logger.warning("변환된 벡터가 없음")
                return 0
            logger.info(f"총 {len(vectors)}개의 포토카드 벡터로 변환 완료")

            logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
            saved_count = self.loader.load_vectors_in_batches(vectors, batch_size=batch_size)
            logger.info(f"임베딩이 없는 데이터 동기화 완료: 총 {saved_count}개의 포토카드 벡터 저장 완료")
            return saved_count

        except Exception as e:
            logger.error(f"임베딩이 없는 데이터 동기화 중 오류 발생: {str(e)}")
            return 0

    def sync_recent_photocard(self, days: int = 1, batch_size: int = 100) -> int:
        try:
            logger.info(f"최근 {days}일 포토카드 데이터 동기화 시작")

            logger.info(f"최근 {days}일 포토카드 데이터 추출 중...")
            photocards = self.extractor.extract_recent_photocards(days=days, batch_size=batch_size)
            if not photocards:
                logger.info(f"최근 {days}일간 변경된 포토카드가 없음")
                return 0
            logger.info(f"총 {len(photocards)}개의 포토카드 데이터 추출 완료")

            logger.info("포토카드 데이터를 벡터로 변환 중...")
            vectors = self.transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
            if not vectors:
                logger.warning("변환된 벡터가 없음")
                return 0
            logger.info(f"총 {len(vectors)}개의 포토카드 벡터로 변환 완료")

            logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
            saved_count = self.loader.load_vectors_in_batches(vectors, batch_size=batch_size)
            logger.info(f"최근 데이터 동기화 완료: 총 {saved_count}개의 포토카드 벡터 저장 완료")
            return saved_count

        except Exception as e:
            logger.error(f"최근 데이터 동기화 중 오류 발생: {str(e)}")
            return 0

    def sync_group_photocard(self, group_name: str, batch_size: int = 100) -> int:
        try:
            logger.info(f"{group_name} 그룹의 포토카드 데이터 동기화 시작")

            logger.info(f"{group_name} 그룹의 포토카드 데이터 추출 중...")
            photocards = self.extractor.extract_photocards_by_group(group_name=group_name, batch_size=batch_size)
            if not photocards:
                logger.info(f"{group_name} 그룹의 포토카드가 없음")
                return 0
            logger.info(f"총 {len(photocards)}개의 {group_name} 그룹 포토카드 데이터 추출 완료")

            logger.info("포토카드 데이터를 벡터로 변환 중...")
            vectors = self.transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
            if not vectors:
                logger.warning("변환된 벡터가 없습니다.")
                return 0
            logger.info(f"총 {len(vectors)}개의 포토카드 벡터로 변환 완료")

            logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
            saved_count = self.loader.load_vectors_in_batches(vectors, batch_size=batch_size)

            logger.info(f"{group_name} 그룹 데이터 동기화 완료: 총 {saved_count}개의 포토카드 벡터 저장 완료")
            return saved_count

        except Exception as e:
            logger.error(f"{group_name} 그룹 데이터 동기화 중 오류 발생: {str(e)}")
            return 0