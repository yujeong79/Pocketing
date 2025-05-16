import logging
import requests
from typing import List, Dict, Any, Optional
from app.config.settings import settings

logger = logging.getLogger(__name__)


class PhotocardExtractor:

    def __init__(self):
        self.api_url = settings.BACKEND_API_URL
        self.headers = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }

    def extract_all_photocards(self, batch_size: int = 100) -> List[Dict[str, Any]]:
        try:
            all_photocards = []
            page = 1
            has_more = True

            while has_more:
                logger.info(f"{page}페이지 데이터 추출 시작")

                response = requests.get(
                    f"{self.api_url}/api/photocards",
                    params={"page": page, "size": batch_size},
                    headers=self.headers
                )
                response.raise_for_status()

                data = response.json()
                photocards = data.get("content", [])

                if not photocards:
                    has_more = False
                else:
                    all_photocards.extend(photocards)
                    page += 1

                    if data.get("last", True):
                        has_more = False
                logger.info(f"페이지 {page - 1} 완료. 총 {len(all_photocards)}개 포토카드")

            logger.info(f"전체 포토카드 추출 완료: {len(all_photocards)}개")
            return all_photocards

        except requests.exceptions.RequestException as e:
            logger.error(f"API 요청 실패: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"포토카드 추출 중 오류 발생: {str(e)}")
            return []

    def extract_photocards_by_group(self, group_name: str, batch_size: int = 20) -> List[Dict[str, Any]]:
        try:
            all_photocards = []
            page = 1
            has_more = True

            while has_more:
                logger.info(f"그룹 {group_name}, 페이지 {page} 데이터 추출 시작")

                response = requests.get(
                    f"{self.api_url}/api/photocards/group/{group_name}",
                    params={"page": page, "size": batch_size},
                    headers=self.headers
                )
                response.raise_for_status()

                data = response.json()
                photocards = data.get("content", [])

                if not photocards:
                    has_more = False
                else:
                    all_photocards.extend(photocards)
                    page += 1

                    if data.get("last", True):
                        has_more = False

                logger.info(f"그룹 {group_name}, 페이지 {page - 1} 완료. 총 {len(all_photocards)}개")

            logger.info(f"그룹 {group_name} 포토카드 추출 완료: {len(all_photocards)}개")
            return all_photocards

        except requests.exceptions.RequestException as e:
            logger.error(f"API 요청 실패: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"그룹별 포토카드 추출 중 오류 발생: {str(e)}")
            return []

    def extract_recent_photocards(self,
                                  days: int = 7,
                                  batch_size: int = 100) -> List[Dict[str, Any]]:
        try:
            all_photocards = []
            page = 1
            has_more = True

            while has_more:
                logger.info(f"최근 {days}일 포토카드, 페이지 {page} 데이터 추출 시작")

                response = requests.get(
                    f"{self.api_url}/api/photocards/recent",
                    params={"days": days, "page": page, "size": batch_size},
                    headers=self.headers
                )
                response.raise_for_status()

                data = response.json()
                photocards = data.get("content", [])

                if not photocards:
                    has_more = False
                else:
                    all_photocards.extend(photocards)
                    page += 1

                    if data.get("last", True):
                        has_more = False

                logger.info(f"최근 {days}일 포토카드, 페이지 {page - 1} 완료. 총 {len(all_photocards)}개")

            logger.info(f"최근 {days}일 포토카드 추출 완료: {len(all_photocards)}개")
            return all_photocards

        except requests.exceptions.RequestException as e:
            logger.error(f"API 요청 실패: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"최근 포토카드 추출 중 오류 발생: {str(e)}")
            return []

    def extract_photocard_by_id(self, card_id: int) -> Optional[Dict[str, Any]]:
        try:
            logger.info(f"포토카드 ID {card_id} 데이터 추출 시작")

            response = requests.get(
                f"{self.api_url}/api/photocards/{card_id}",
                headers=self.headers
            )
            response.raise_for_status()

            photocard = response.json()
            logger.info(f"포토카드 ID {card_id} 추출 완료")
            return photocard

        except requests.exceptions.HTTPError as e:
            if e.response.status_code == 404:
                logger.warning(f"포토카드 ID {card_id}를 찾을 수 없음")
            else:
                logger.error(f"API 요청 실패: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"포토카드 추출 중 오류 발생: {str(e)}")
            return None

    def extract_photocards_without_embeddings(self, batch_size: int = 100) -> List[Dict[str, Any]]:
        try:
            all_photocards = []
            page = 0
            has_more = True

            while has_more:
                logger.info(f"임베딩 없는 포토카드, 페이지 {page} 데이터 추출 시작")

                response = requests.get(
                    f"{self.api_url}/api/photocards/without-embeddings",
                    params={"page": page, "size": batch_size},
                    headers=self.headers
                )
                response.raise_for_status()

                data = response.json()
                photocards = data.get("result", [])

                if not photocards:
                    has_more = False
                else:
                    all_photocards.extend(photocards)
                    page += 1

                logger.info(f"임베딩 없는 포토카드, 페이지 {page - 1} 완료. 총 {len(all_photocards)}개")

            logger.info(f"임베딩 없는 포토카드 추출 완료: {len(all_photocards)}개")
            return all_photocards

        except requests.exceptions.RequestException as e:
            logger.error(f"API 요청 실패: {str(e)}")
            return []
        except Exception as e:
            logger.error(f"임베딩 없는 포토카드 추출 중 오류 발생: {str(e)}")
            return []

    def update_embedding_status(self, card_id: int, has_embedding: bool = True) -> bool:
        try:
            logger.info(f"포토카드 ID {card_id}의 임베딩 상태 업데이트: {has_embedding}")
            response = requests.post(
                f"{self.api_url}/api/photocards/{card_id}/embedding-status",
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()
            logger.info(f"포토카드 ID {card_id}의 임베딩 상태 업데이트 성공")
            return True
        except Exception as e:
            logger.error(f"임베딩 상태 업데이트 실패: {str(e)}")
            return False