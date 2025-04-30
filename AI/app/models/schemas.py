from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Dict, Any, Union
from enum import Enum



class ChatRequest(BaseModel):
    user_id: int
    chat_message: str
    chat_message_id: Optional[int] = None

class PostInfo(BaseModel):
    post_id: int
    price: int
    post_image_url: str
    nickname: str

class PhotoCardResult(BaseModel):
    card_id: int
    cheapest_post: PostInfo

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
    tags: List[str]
    embedding: List[float]  # 임베딩 벡터