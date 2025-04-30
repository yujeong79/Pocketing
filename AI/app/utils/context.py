from typing import List, Dict, Any, Optional
import logging
from datetime import datetime

logger = logging.getLogger(__name__) # 로거 객체 생성

class Context:
    def __init__(self, max_context_length: int = 10, max_tokens: int = 4000):
        self.messages: List[Dict[str, Any]] = []
        self.max_context_length = max_context_length
        self.max_tokens = max_tokens

def add_message(self, role: str, content: str, metadata:Optional[str]=None) -> None:
    message = {
        "role": role,
        "content": content,
        "timestamp": datetime.now().isoformat(),
    }
    if metadata:
        message["metadata"] = metadata
    self.messages.append(message)
