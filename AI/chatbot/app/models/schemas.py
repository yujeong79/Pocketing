from pydantic import Field
from app.config.settings import settings
from pydantic import BaseModel
from typing import List, Optional
from enum import Enum
import time
import hashlib


class CacheTTLStrategy(str, Enum):
    HOT_GROUP = "hot_group" # 10초 캐싱
    NORMAL_GROUP = "normal_group" # 3분 캐싱(180초)

class ChatRequest(BaseModel):
    user_id: int
    chat_message: str
    chat_message_id: Optional[int] = None

class PostInfo(BaseModel):
    post_id: Optional[int] = None
    price: Optional[int] = None
    post_image_url: Optional[str] = None
    card_image_url: Optional[str] = None
    nickname: str
    last_updated: str = Field(default_factory= lambda: time.strftime("%Y-%m-%dT%H:%M:%SZ"))

class PhotoCardResult(BaseModel):
    card_id: int
    cheapest_post: Optional[PostInfo] = None
    cache_key: Optional[str] = Field(None, exclude=True)
    ttl : Optional[int] = Field(None, exclude=True)

class ChatResponseMeta(BaseModel):
    user_id: int
    total_results: int
    in_response_to: int
    new_chat_message_id: int

class ChatResponseResult(BaseModel):
    text: str
    photocards: List[PhotoCardResult]
    meta: ChatResponseMeta

class ChatResponse(BaseModel):
    status: str
    code: int
    message: str
    result: ChatResponseResult

class ErrorCode(str, Enum):
    SEARCH_ERROR = "SEARCH_ERROR"
    PARSING_ERROR = "PARSING_ERROR"
    SERVER_ERROR = "SERVER_ERROR"
    CACHE_ERROR = "CACHE_ERROR"

class ErrorResponse(BaseModel):
    status: str = "ERROR"
    code: int
    message: str
    error_type: ErrorCode

class PhotoCardVector(BaseModel):
    card_id: int
    card_image_url: str
    member_id: int
    album_id: int
    group_id: int
    member_name: str
    group_name: str
    album_name: str
    tag: List[str]
    embedding: List[float]  # 임베딩 벡터

class CacheConfig(BaseModel):
    enabled: bool = True
    strategy: CacheTTLStrategy = CacheTTLStrategy.NORMAL_GROUP

    def get_ttl_seconds(self) -> int:
        if self.strategy == CacheTTLStrategy.HOT_GROUP:
            return 10
        return 180

class BulkPhotoCardRequest(BaseModel):
    card_ids: List[int]
    force_refresh: Optional[bool] = False

class BulkPhotoCardResponse(BaseModel):
    results: List[PhotoCardResult]

def generate_cache_key(card_id:int, salt: str = None) -> str:
    salt = salt or getattr(settings, "CACHE_SECRET_KEY", "cache_default_salt")

    combined = f"{card_id}:{salt}"
    hashed = hashlib.sha256(combined.encode()).hexdigest()[:12]

    return f"pk:{card_id}:{hashed}"