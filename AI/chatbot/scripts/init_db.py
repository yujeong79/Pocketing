import sys
import os
import argparse
import logging

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.etl.extract import PhotocardExtractor
from app.etl.transform import PhotocardTransformer
from app.etl.load import PhotocardLoader
from app.services.vectorstore import VectorStore
from app.config.settings import settings

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def init_vectorstore(force_reset: bool = False):
    try:
        logger.info("벡터 데이터베이스 초기화 시작")
        vector_store=VectorStore()

        if force_reset and hasattr(vector_store, '_reset'):
            logger.warning("기존 데이터베이스를 초기화함")
            result = vector_store._reset()
            if not result:
                logger.error("데이터베이스 초기화 실패")
                return False
            logger.info("벡터 데이터베이스 초기화 완료")

        count = vector_store._get_vector_count() if hasattr(vector_store, '_get_vector_count') else 0
        logger.info(f"현재 저장된 벡터 수: {count}")
        return True
    except Exception as e:
        logger.error(f"벡터 데이터베이스 초기화 중 오류 발생:{str(e)}")
        return False


def run_etl_pipeline(batch_size: int = 100):
    try:
        logger.info("포토카드 ETL 파이프라인 시작")

        extractor = PhotocardExtractor()
        transformer = PhotocardTransformer()
        loader = PhotocardLoader()

        logger.info("모든 포토카드 데이터 추출 중...")
        photocards = extractor.extract_all_photocards(batch_size=batch_size)
        if not photocards:
            logger.warning("처리할 포토카드 데이터가 없음")
            return 0
        logger.info(f"총 {len(photocards)}개의 포토카드 데이터 추출 완료")

        logger.info("포토카드 데이터를 벡터로 변환 중...")
        vectors = transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
        if not vectors:
            logger.warning("변환된 벡터가 없음")
            return 0
        logger.info(f"총 {len(vectors)}개의 포토카드 벡터로 변환 완료")

        logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
        saved_count = loader.load_vectors_in_batches(vectors, batch_size=batch_size)
        logger.info(f"ETL 파이프라인 완료: 총 {saved_count}개의 포토카드 벡터가 저장 완료")
        return saved_count

    except Exception as e:
        logger.error(f"ETL 파이프라인 실행 중 오류 발생: {str(e)}")
        return 0


def run_etl_by_group(group_name: str, batch_size: int = 100):
    try:
        logger.info(f"그룹 '{group_name}'의 포토카드 ETL 파이프라인 시작")

        extractor = PhotocardExtractor()
        transformer = PhotocardTransformer()
        loader = PhotocardLoader()

        logger.info(f"그룹 '{group_name}'의 포토카드 데이터 추출 중...")
        photocards = extractor.extract_photocards_by_group(group_name=group_name, batch_size=batch_size)
        if not photocards:
            logger.warning(f"그룹 '{group_name}'의 처리할 포토카드 데이터가 없음")
            return 0
        logger.info(f"총 {len(photocards)}개의 '{group_name}' 그룹 포토카드 데이터를 추출 완료")

        logger.info("포토카드 데이터를 벡터로 변환 중...")
        vectors = transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
        if not vectors:
            logger.warning("변환된 벡터가 없음")
            return 0
        logger.info(f"총 {len(vectors)}개의 '{group_name}' 그룹 포토카드 벡터로 변환 완료")

        logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
        saved_count = loader.load_vectors_in_batches(vectors, batch_size=batch_size)

        logger.info(f"그룹 ETL 파이프라인 완료: 총 {saved_count}개의 '{group_name}' 그룹 포토카드 벡터 저장 완료")
        return saved_count

    except Exception as e:
        logger.error(f"그룹 ETL 파이프라인 실행 중 오류 발생: {str(e)}")
        return 0


def run_etl_recent(days: int = 7, batch_size: int = 100):
    try:
        logger.info(f"최근 {days}일 포토카드 ETL 파이프라인 시작")

        extractor = PhotocardExtractor()
        transformer = PhotocardTransformer()
        loader = PhotocardLoader()

        logger.info(f"최근 {days}일 포토카드 데이터 추출 중...")
        photocards = extractor.extract_recent_photocards(days=days, batch_size=batch_size)
        if not photocards:
            logger.warning(f"최근 {days}일 동안의 처리할 포토카드 데이터가 없음")
            return 0
        logger.info(f"총 {len(photocards)}개의 최근 {days}일 포토카드 데이터 추출 완료")

        logger.info("포토카드 데이터를 벡터로 변환 중...")
        vectors = transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
        if not vectors:
            logger.warning("변환된 벡터가 없음")
            return 0
        logger.info(f"총 {len(vectors)}개의 최근 포토카드 벡터로 변환 완료")

        logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
        saved_count = loader.load_vectors_in_batches(vectors, batch_size=batch_size)
        logger.info(f"최근 데이터 ETL 파이프라인 완료: 총 {saved_count}개의 최근 포토카드 벡터가 저장 완료")
        return saved_count

    except Exception as e:
        logger.error(f"최근 데이터 ETL 파이프라인 실행 중 오류 발생: {str(e)}")
        return 0


def run_etl_missing(batch_size: int = 100):
    try:
        logger.info("임베딩이 없는 포토카드 ETL 파이프라인 시작")

        extractor = PhotocardExtractor()
        transformer = PhotocardTransformer()
        loader = PhotocardLoader()

        logger.info("임베딩이 없는 포토카드 데이터 추출 중...")
        photocards = extractor.extract_photocards_without_embeddings(batch_size=batch_size)
        if not photocards:
            logger.warning("임베딩이 없는 포토카드 데이터가 없음")
            return 0
        logger.info(f"총 {len(photocards)}개의 임베딩이 없는 포토카드 데이터 추출 완료")

        logger.info("포토카드 데이터를 벡터로 변환 중...")
        vectors = transformer.transform_bulk_to_vectors(photocards=photocards, batch_size=batch_size)
        if not vectors:
            logger.warning("변환된 벡터가 없음")
            return 0
        logger.info(f"총 {len(vectors)}개의 포토카드 벡터로 변환 완료")

        logger.info("벡터 데이터베이스에 포토카드 벡터 저장 중...")
        saved_count = loader.load_vectors_in_batches(vectors, batch_size=batch_size)
        logger.info(f"임베딩 없는 데이터 ETL 파이프라인 완료: 총 {saved_count}개의 포토카드 벡터 저장 완료")
        return saved_count

    except Exception as e:
        logger.error(f"임베딩 없는 데이터 ETL 파이프라인 실행 중 오류 발생: {str(e)}")
        return 0

def main():
    parser = argparse.ArgumentParser(description='벡터 데이터베이스 초기화 및 데이터 로드')
    parser.add_argument('--reset', action='store_true', help='기존 데이터베이스 초기화 (주의: 모든 데이터가 삭제됨)')
    parser.add_argument('--mode', type=str, choices=['all', 'group', 'recent', 'missing'], default='all',
                        help='ETL 모드 선택 (기본값: all)')
    parser.add_argument('--group', type=str, help='그룹 이름 (mode가 group일 때 필요)')
    parser.add_argument('--days', type=int, default=7, help='최근 n일 데이터 (mode가 recent일 때 사용, 기본값: 7)')
    parser.add_argument('--batch-size', type=int, default=100, help='처리 배치 크기 (기본값: 100)')
    parser.add_argument('--skip-etl', action='store_true', help='ETL 파이프라인 건너뛰기 (데이터베이스 초기화만 수행)')

    args = parser.parse_args()
    db_init_success = init_vectorstore(force_reset=args.reset)
    if not db_init_success:
        logger.error("데이터베이스 초기화 실패, 종료")
        sys.exit(1)

    # ETL 파이프라인 실행 (skip-etl 옵션이 지정되지 않은 경우)
    if not args.skip_etl:
        saved_count = 0

        if args.mode == 'all':
            saved_count = run_etl_pipeline(batch_size=args.batch_size)
        elif args.mode == 'group':
            if not args.group:
                logger.error("그룹 이름이 필요합니다. --group 인자를 사용하세요.")
                sys.exit(1)
            saved_count = run_etl_by_group(group_name=args.group, batch_size=args.batch_size)
        elif args.mode == 'recent':
            saved_count = run_etl_recent(days=args.days, batch_size=args.batch_size)
        elif args.mode == 'missing':
            saved_count = run_etl_missing(batch_size=args.batch_size)

        logger.info(f"데이터베이스 초기화 및 데이터 로드 완료: {saved_count}개의 포토카드 벡터가 저장 완료됨")
    else:
        logger.info("ETL 파이프라인을 건너뛰고 데이터베이스 초기화만 완료함")


if __name__ == "__main__":
    main()