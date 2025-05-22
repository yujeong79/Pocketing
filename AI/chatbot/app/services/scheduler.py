import logging
import threading
import schedule
import time

from app.services.sync_database import SyncDatabase

logger = logging.getLogger(__name__)


class Scheduler:

    def __init__(self):
        self.sync_database = SyncDatabase()
        self.thread = None
        self.running = False

    def start(self):
        if self.running:
            logger.warning("스케줄러가 이미 실행 중입니다")
            return

        self.running = True
        self.thread = threading.Thread(target=self._run_scheduler, daemon=True)
        self.thread.start()
        logger.info("스케줄러 시작")

    def stop(self):
        self.running = False
        if self.thread:
            self.thread.join(timeout=2.0)
            logger.info("스케줄러 중지")

    def _run_scheduler(self):

        schedule.every(60).minutes.do(self.sync_database.sync_missing_photocard, batch_size=100)
        logger.info("임베딩이 없는 데이터 동기화 작업 설정: 60분 간격")

        schedule.every(6).hours.do(self.sync_database.sync_recent_photocard, days=1, batch_size=100)
        logger.info("최근 데이터 동기화 작업 설정: 6시간 간격, 1일치 데이터")

        popular_groups = ["방탄소년단", "블랙핑크", "세븐틴", "아이브", "에스파"]
        for group in popular_groups:
            schedule.every().sunday.at("03:00").do(
                self.sync_database.sync_group_photocard,
                group_name=group,
                batch_size=100
            )
            logger.info(f"그룹 '{group}' 동기화 작업 설정: 매주 일요일 03:00")

        while self.running:
            schedule.run_pending()
            time.sleep(60)