from typing import List, Dict, Any, Optional
import logging
from datetime import datetime
import json

from app.models.schemas import PhotoCardResult

logger = logging.getLogger(__name__)


class MessageContext:

    def __init__(self, user_id: int = None, max_context_length: int = 10, max_tokens: int = 4000):
        self.messages: List[Dict[str, Any]] = []
        self.user_id = user_id
        self.max_context_length = max_context_length
        self.max_tokens = max_tokens
        self.current_message_id = 0
        self.photocards_history: Dict[int, List[PhotoCardResult]] = {}

    def add_message(self, role: str, content: str, metadata: Optional[Dict[str, Any]] = None) -> int:
        if role == "user":
            self.current_message_id += 1
        message = {
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat(),
            "message_id": self.current_message_id if role == "user" else None,
        }
        if metadata:
            message["metadata"] = metadata
        self.messages.append(message)
        self._limit_context()
        logger.debug(f"{role}의 메시지가 추가됨. 현재 대화 기록: {len(self.messages)}개, 메시지 ID: {message.get('message_id')}")
        return self.current_message_id

    def _limit_context(self):
        system_messages = [m for m in self.messages if m["role"] == "system"]
        non_system_messages = [m for m in self.messages if m["role"] != "system"]
        if len(non_system_messages) > self.max_context_length:
            non_system_messages = non_system_messages[-self.max_context_length:]
        self.messages = system_messages + non_system_messages
        logger.info(f"대화 기록을 {len(self.messages)}개로 제한함")

    def get_messages(self) -> List[Dict[str, Any]]:
        return self.messages

    def get_formatted_messages(self, include_roles: Optional[List[str]] = None) -> List[Dict[str, Any]]:
        if include_roles:
            filtered_messages = [m for m in self.messages if m["role"] in include_roles]
        else:
            filtered_messages = self.messages
        return [{"role": m["role"], "content": m["content"]} for m in filtered_messages]

    def add_rag_results(self, rag_results: str, position: str = "latest") -> None:
        if not rag_results:
            return
        rag_message = {
            "role": "system",
            "content": f"포토카드 벡터 정보:{rag_results}",
            "timestamp": datetime.now().isoformat(),
            "metadata": {"type": "rag_results"},
        }
        if position == "latest":
            self.messages.append(rag_message)
        elif position == "beginning":
            system_messages = [m for m in self.messages if m["role"] == "system"]
            other_messages = [m for m in self.messages if m["role"] != "system"]
            self.messages = system_messages + [rag_message] + other_messages
        elif position == "relevant":
            for i in range(len(self.messages) - 1, -1, -1):
                if self.messages[i]["role"] == "user":
                    self.messages.insert(i + 1, rag_message)
                    break
        else:
            self.messages.append(rag_message)
        self._limit_context()
        logger.info(f"rag 결과 추가됨")

    def add_photocard_results(self, message_id: int, photocards: List[PhotoCardResult]) -> None:
        if not photocards:
            return
        self.photocards_history[message_id] = photocards
        logger.info(f"메시지 ID {message_id}에 {len(photocards)}개의 포토카드 결과 저장됨")

    def get_photocard_results(self, message_id: int) -> List[PhotoCardResult]:
        return self.photocards_history.get(message_id, [])

    def get_last_message_id(self) -> int:
        return self.current_message_id

    def get_last_user_message(self) -> Optional[Dict[str, Any]]:
        for message in reversed(self.messages):
            if message["role"] == "user":
                return message
        return None

    def clear(self, keep_system: bool = True) -> None:
        if keep_system:
            self.messages = [m for m in self.messages if m["role"] == "system"]
        else:
            self.messages = []
        self.photocards_history = {}
        logger.info(f"대화 내용 청소됨. 현재 대화 기록: {len(self.messages)}개")

    def to_dict(self) -> Dict[str, Any]:
        photocards_dict = {}
        for msg_id, cards in self.photocards_history.items():
            photocards_dict[str(msg_id)] = [card.dict() for card in cards]
        return {
            "user_id": self.user_id,
            "messages": self.messages,
            "current_message_id": self.current_message_id,
            "photocards_history": photocards_dict,
            "max_context_length": self.max_context_length,
            "max_tokens": self.max_tokens
        }

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'MessageContext':
        context = cls(
            user_id=data.get("user_id"),
            max_context_length=data.get("max_context_length", 10),
            max_tokens=data.get("max_tokens", 4000)
        )
        context.messages = data.get("messages", [])
        context.current_message_id = data.get("current_message_id", 0)
        photocards_dict = data.get("photocards_history", {})
        for msg_id_str, cards_data in photocards_dict.items():
            msg_id = int(msg_id_str)
            cards = [PhotoCardResult(**card_data) for card_data in cards_data]
            context.photocards_history[msg_id] = cards
        return context

    def to_json(self) -> str:
        return json.dumps(self.to_dict(), ensure_ascii=False)

    @classmethod
    def from_json(cls, json_str: str) -> 'MessageContext':
        data = json.loads(json_str)
        return cls.from_dict(data)