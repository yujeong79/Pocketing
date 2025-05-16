import os
import sys
import logging
import argparse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from contextlib import asynccontextmanager

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.api.routes import router as api_router
from scripts.init_db import init_vectorstore, run_etl_missing
from app.services.scheduler import Scheduler

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)
scheduler = Scheduler()

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("애플리케이션 시작 중...")
    db_init_success = init_vectorstore(force_reset=False)
    if not db_init_success:
        logger.error("벡터 데이터베이스 초기화 실패")
    else:
        logger.info("벡터 데이터베이스 초기화 성공")

    try:
        saved_count = run_etl_missing(batch_size=100)
        logger.info(f"누락된 포토카드 처리 완료: {saved_count}개 저장됨")
    except Exception as e:
        logger.error(f"누락된 포토카드 처리 중 오류 발생: {str(e)}")

    scheduler.start()

    yield

    logger.info("애플리케이션 종료 중...")
    scheduler.stop()
    logger.info("스케줄러 종료됨")

app = FastAPI(
    title="포켓팅 챗봇 API",
    description="포토카드 검색 및 추천 챗봇 API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

def main():
    parser = argparse.ArgumentParser(description="포켓팅 챗봇 서버")
    parser.add_argument("--host", type=str, default="0.0.0.0", help="서버 호스트 (기본값: 0.0.0.0)")
    parser.add_argument("--port", type=int, default=8000, help="서버 포트 (기본값: 8000)")
    parser.add_argument("--reload", action="store_true", help="자동 리로드 활성화")

    args = parser.parse_args()

    logger.info(f"서버 시작: {args.host}:{args.port}")

    uvicorn.run(
        "app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload,
        log_level="info",
    )

if __name__ == "__main__":
    main()