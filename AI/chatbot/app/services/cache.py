import logging
import json
import redis
import requests
from typing import Dict, List, Optional, Any, Union
from datetime import datetime

from app.config.settings import settings
from app.models.schemas import (
    PhotoCardResult, PostInfo, CacheTTLStrategy,
    generate_cache_key, CacheConfig
)

logger = logging.getLogger(__name__)


class RedisCache:

    HOT_GROUPS = ["방탄소년단", "블랙핑크", "세븐틴", "아이브", "에스파"]
    def __init__(self):
        try:
            redis_params = {
                "host": settings.REDIS_HOST,
                "port": settings.REDIS_PORT,
                "db": settings.REDIS_DB,
                "decode_responses": True
            }
            self.redis_client = redis.Redis(**redis_params)
            self.chat_prefix = "chat:"
            self.post_prefix = "post:"
            self.api_url = settings.BACKEND_API_URL
            self.headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            logger.info("Redis 캐시 및 포토카드 판매글 클라이언트 초기화 완료")
        except Exception as e:
            logger.error(f"Redis 연결 실패: {str(e)}")
            self.redis_client = None

    # ---------- 레디스 기본 연산 ----------
    def set(self, key: str, value: str, expiry: int = None) -> bool:
        try:
            if self.redis_client:
                self.redis_client.set(key, value, ex=expiry)
                return True
            return False
        except Exception as e:
            logger.error(f"Redis SET 연산 실패: {str(e)}")
            return False

    def get(self, key: str) -> Optional[str]:
        try:
            if self.redis_client:
                return self.redis_client.get(key)
            return None
        except Exception as e:
            logger.error(f"Redis GET 연산 실패: {str(e)}")
            return None

    def delete(self, key: str) -> bool:
        try:
            if self.redis_client:
                return self.redis_client.delete(key) > 0
            return False
        except Exception as e:
            logger.error(f"Redis DELETE 연산 실패: {str(e)}")
            return False

    def get_ttl(self, key: str) -> int:
        try:
            if self.redis_client:
                ttl = self.redis_client.ttl(key)
                return max(0, ttl)
            return 0
        except Exception as e:
            logger.error(f"Redis TTL 연산 실패: {str(e)}")
            return 0

    # ---------- 챗봇 컨텍스트 관리 (간소화) ----------
    def save_chat_context(self, user_id: int, context_json: str, expiry: int = 3600) -> bool:
        try:
            key = f"{self.chat_prefix}{user_id}"
            return self.set(key, context_json, expiry)
        except Exception as e:
            logger.error(f"채팅 컨텍스트 저장 실패: {str(e)}")
            return False

    def get_chat_context(self, user_id: int) -> Optional[str]:
        try:
            key = f"{self.chat_prefix}{user_id}"
            return self.get(key)
        except Exception as e:
            logger.error(f"채팅 컨텍스트 조회 실패: {str(e)}")
            return None

    def clear_chat_context(self, user_id: int) -> bool:
        try:
            key = f"{self.chat_prefix}{user_id}"
            return self.delete(key)
        except Exception as e:
            logger.error(f"채팅 컨텍스트 삭제 실패: {str(e)}")
            return False

    # ---------- 포토카드 최저가 판매글 캐싱 ----------
    def _get_cache_config(self, group_name: Optional[str] = None) -> CacheConfig:
        if not group_name:
            return CacheConfig(strategy=CacheTTLStrategy.NORMAL_GROUP)
        if group_name in self.HOT_GROUPS:
            return CacheConfig(strategy=CacheTTLStrategy.HOT_GROUP)
        return CacheConfig(strategy=CacheTTLStrategy.NORMAL_GROUP)

    def get_cheapest_post_by_card_id(self, card_id: int, group_name: Optional[str] = None,
                                     force_refresh: bool = False) -> Optional[PhotoCardResult]:

        try:
            cache_config = self._get_cache_config(group_name)
            cache_key = f"{self.post_prefix}{generate_cache_key(card_id)}"
            if not force_refresh and cache_config.enabled and self.redis_client:
                cached_data = self.get(cache_key)
                if cached_data:
                    try:
                        cached_json = json.loads(cached_data)
                        ttl = self.get_ttl(cache_key)

                        post_info = PostInfo(
                            post_id=cached_json["post_id"],
                            price=cached_json["price"],
                            post_image_url=cached_json["post_image_url"],
                            nickname=cached_json["nickname"],
                            last_updated=cached_json["last_updated"]
                        )
                        result = PhotoCardResult(
                            card_id=card_id,
                            cheapest_post=post_info,
                            _cache_key=cache_key,
                            _ttl=ttl
                        )
                        logger.info(f"포토카드 ID {card_id}의 최저가 판매글 캐시에서 조회 성공")
                        return result
                    except Exception as e:
                        logger.error(f"캐시된 데이터 파싱 오류: {str(e)}")
                        self.delete(cache_key)

            logger.info(f"포토카드 ID {card_id}의 최저가 판매글 API에서 조회 시작")
            response = requests.get(
                f"{self.api_url}/api/posts/cheapest",
                params={"cardId": card_id},
                headers=self.headers,
                timeout=10
            )
            response.raise_for_status()

            data = response.json()
            if data.get("success") and "result" in data:
                result_data = data["result"]
                if result_data.get("post_id") is not None:
                    post_info = PostInfo(
                        post_id=result_data.get("post_id"),
                        price=result_data.get("price"),
                        post_image_url=result_data.get("post_image_url"),
                        nickname=result_data.get("nickname"),
                        last_updated=result_data.get("last_updated")
                    )

                    if cache_config.enabled and self.redis_client:
                        cache_ttl = cache_config.get_ttl_seconds()
                        cache_data = {
                            "post_id": post_info.post_id,
                            "price": post_info.price,
                            "post_image_url": post_info.post_image_url,
                            "nickname": post_info.nickname,
                            "last_updated": post_info.last_updated
                        }
                        self.set(cache_key, json.dumps(cache_data), expiry=cache_ttl)
                        logger.info(f"포토카드 ID {card_id}의 최저가 판매글 캐시에 저장 (TTL: {cache_ttl}초)")

                    result = PhotoCardResult(
                        card_id=card_id,
                        cheapest_post=post_info,
                        _cache_key=cache_key,
                        _ttl=cache_config.get_ttl_seconds()
                    )
                    logger.info(f"포토카드 ID {card_id}의 최저가 판매글 API에서 조회 성공")
                    return result
                else:
                    logger.info(f"포토카드 ID {card_id}의 판매글 없음, 포토카드 대표 이미지 정보만 반환")

                    post_info = PostInfo(
                        post_id=None,
                        price=None,
                        post_image_url=result_data.get("card_image_url"),
                        nickname="판매자 없음",
                        last_updated=result_data.get("last_updated")
                    )
                    result = PhotoCardResult(
                        card_id=card_id,
                        cheapest_post=post_info
                    )
                    return result
            else:
                logger.warning(f"포토카드 ID {card_id}의 최저가 판매글 API 응답 오류")
                return None

        except requests.exceptions.HTTPError as e:
            if hasattr(e, 'response') and e.response.status_code == 404:
                logger.warning(f"포토카드 ID {card_id}를 찾을 수 없음")
            else:
                logger.error(f"API 요청 실패: {str(e)}")
            return None
        except Exception as e:
            logger.error(f"최저가 판매글 조회 중 오류 발생: {str(e)}")
            return None

    def get_cheapest_posts_by_card_ids(self, card_ids: List[int], group_name: Optional[str] = None,
                                       force_refresh: bool = False) -> Dict[int, PhotoCardResult]:
        try:
            if not card_ids:
                logger.warning("조회할 포토카드 ID가 없음")
                return {}

            results = {}
            missing_card_ids = []
            cache_config = self._get_cache_config(group_name)

            if not force_refresh and cache_config.enabled and self.redis_client:
                for card_id in card_ids:
                    cache_key = f"{self.post_prefix}{generate_cache_key(card_id)}"
                    cached_data = self.get(cache_key)
                    if cached_data:
                        try:
                            cached_json = json.loads(cached_data)
                            ttl = self.get_ttl(cache_key)

                            logger.debug(f"캐시에서 조회한 데이터: {cached_json}")

                            post_id = cached_json.get("post_id")
                            has_post = post_id is not None and post_id != 0

                            logger.debug(f"포토카드 ID {card_id}: post_id={post_id}, has_post={has_post}")

                            if has_post:
                                post_image_url = cached_json.get("post_image_url")
                                card_image_url = None
                            else:
                                post_image_url = None
                                card_image_url = cached_json.get("card_image_url")

                            post_info = PostInfo(
                                post_id=post_id,
                                price=cached_json.get("price"),
                                post_image_url=post_image_url,
                                card_image_url=card_image_url,
                                nickname=cached_json.get("nickname", "판매자 없음"),
                                last_updated=cached_json.get("last_updated",
                                                             datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"))
                            )

                            results[card_id] = PhotoCardResult(
                                card_id=card_id,
                                cheapest_post=post_info,
                                cache_key=cache_key,
                                ttl=ttl
                            )
                            logger.debug(f"포토카드 ID {card_id}의 정보를 캐시에서 조회 성공: {post_info}")
                        except Exception as e:
                            logger.error(f"캐시된 데이터 파싱 오류 (카드 ID {card_id}): {str(e)}")
                            missing_card_ids.append(card_id)
                    else:
                        missing_card_ids.append(card_id)
            else:
                missing_card_ids = card_ids

            if missing_card_ids:
                card_ids_str = ",".join(map(str, missing_card_ids))
                api_url = f"{self.api_url}/api/posts/cheapest/bulk"

                logger.info(f"{len(missing_card_ids)}개 포토카드의 최저가 판매글 API에서 일괄 조회 시작")
                logger.info(f"요청 URL: {api_url}?cardIds={card_ids_str}")
                logger.info(f"요청 헤더: {self.headers}")

                try:
                    response = requests.get(
                        api_url,
                        params={"cardIds": card_ids_str},
                        headers=self.headers,
                        timeout=15
                    )

                    logger.info(f"API 응답 상태 코드: {response.status_code}")
                    response.raise_for_status()
                    data = response.json()

                    logger.info(f"API 응답 상세 내용: {json.dumps(data)}")

                    if data.get("isSuccess") and "result" in data:
                        result_data = data["result"]

                        for card_id_str, post_data in result_data.items():
                            try:
                                card_id = int(card_id_str)
                                logger.info(f"포토카드 ID {card_id}의 API 응답 데이터: {post_data}")

                                post_id = post_data.get("post_id")
                                has_post = post_id is not None
                                logger.info(f"포토카드 ID {card_id}: post_id={post_id}, has_post={has_post}")

                                if has_post:
                                    post_image_url = post_data.get("post_image_url")
                                    card_image_url = None
                                    price = post_data.get("price")
                                else:
                                    post_image_url = None
                                    card_image_url = post_data.get("post_image_url")  # API가 여기에 카드 이미지 제공
                                    price = None

                                post_info = PostInfo(
                                    post_id=post_id,
                                    price=price,
                                    post_image_url=post_image_url,
                                    card_image_url=card_image_url,
                                    nickname=post_data.get("nickname", "판매자 없음"),
                                    last_updated=post_data.get("last_updated",
                                                               datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"))
                                )

                                logger.info(f"생성된 PostInfo: post_id={post_info.post_id}, price={post_info.price}, "
                                            f"post_image_url={post_info.post_image_url}, card_image_url={post_info.card_image_url}")

                                if cache_config.enabled and self.redis_client and has_post:
                                    cache_key = f"{self.post_prefix}{generate_cache_key(card_id)}"
                                    cache_ttl = cache_config.get_ttl_seconds()
                                    cache_data = {
                                        "post_id": post_info.post_id,
                                        "price": post_info.price,
                                        "post_image_url": post_info.post_image_url,
                                        "card_image_url": post_info.card_image_url,
                                        "nickname": post_info.nickname,
                                        "last_updated": post_info.last_updated
                                    }
                                    self.set(cache_key, json.dumps(cache_data), expiry=cache_ttl)
                                    logger.debug(f"포토카드 ID {card_id}의 정보 캐시 저장 완료 (TTL: {cache_ttl}초)")

                                results[card_id] = PhotoCardResult(
                                    card_id=card_id,
                                    cheapest_post=post_info,
                                    cache_key=cache_key if cache_config.enabled and self.redis_client and has_post else None,
                                    ttl=cache_ttl if cache_config.enabled and self.redis_client and has_post else None
                                )

                            except Exception as e:
                                logger.error(f"포토카드 ID {card_id_str} 처리 중 오류: {str(e)}", exc_info=True)
                                self._create_empty_result(int(card_id_str), results)

                        logger.info(f"포토카드 최저가 판매글 API 일괄 조회 성공: {len(results)}개 결과")
                    else:
                        logger.warning(f"포토카드 최저가 판매글 API 응답 오류: {data}")
                        self._create_empty_results(missing_card_ids, results)

                except requests.exceptions.HTTPError as e:
                    logger.error(f"API 요청 실패: {str(e)}")
                    if hasattr(e, 'response'):
                        logger.error(f"응답 본문: {e.response.text}")
                    self._create_empty_results(missing_card_ids, results)

                except requests.exceptions.RequestException as e:
                    logger.error(f"API 요청 중 오류 발생: {str(e)}")
                    self._create_empty_results(missing_card_ids, results)

                except Exception as e:
                    logger.error(f"최저가 판매글 일괄 조회 중 예상치 못한 오류 발생: {str(e)}", exc_info=True)
                    self._create_empty_results(missing_card_ids, results)

            for card_id, result in results.items():
                post_id = result.cheapest_post.post_id if result.cheapest_post else None
                price = result.cheapest_post.price if result.cheapest_post else None
                logger.info(f"최종 결과 - 포토카드 ID {card_id}: post_id={post_id}, price={price}")

            return results

        except Exception as e:
            logger.error(f"최저가 판매글 일괄 조회 중 최상위 오류 발생: {str(e)}", exc_info=True)
            return {}

    def _create_empty_result(self, card_id: int, results: Dict[int, PhotoCardResult]) -> None:
        card_image_url = None
        try:
            from app.services.vectorstore import VectorStore
            vectorstore = VectorStore()
            card_vector = vectorstore.get_vector(str(card_id))
            if card_vector and card_vector.get("metadata"):
                card_image_url = card_vector["metadata"].get("card_image_url")
                logger.info(f"벡터스토어에서 card_id {card_id}의 이미지 URL 조회: {card_image_url}")
        except Exception as e:
            logger.error(f"카드 이미지 URL 조회 실패: {str(e)}")

        post_info = PostInfo(
            post_id=None,
            price=None,
            post_image_url=None,
            card_image_url=card_image_url,
            nickname="판매자 없음",
            last_updated=datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
        )
        results[card_id] = PhotoCardResult(
            card_id=card_id,
            cheapest_post=post_info
        )
        logger.info(f"빈 결과 생성 완료 - 포토카드 ID {card_id}")

    def _create_empty_results(self, card_ids: List[int], results: Dict[int, PhotoCardResult]) -> None:
        for card_id in card_ids:
            if card_id not in results:
                self._create_empty_result(card_id, results)