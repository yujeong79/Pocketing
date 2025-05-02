from typing import List, Dict, Any, Optional
import logging
from datetime import datetime

logger = logging.getLogger(__name__) # 로거 객체 생성

class MessageContext:

    def __init__(self, max_context_length: int = 10, max_tokens: int = 4000):
        self.messages: List[Dict[str, Any]] = []
        self.max_context_length = max_context_length
        self.max_tokens = max_tokens

    def add_message(self, role: str, content: str, metadata:Optional[Dict[str,Any]]=None) -> None:
        message = {
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat(),
        }
        if metadata:
            message["metadata"] = metadata

        self.messages.append(message)
        self._limit_context()
        logger.debug(f"{role}의 메시지가 추가됨. 현재 대화 기록:{len(self.messages)}개")

    def _limit_context(self):
        system_messages = [m for m in self.messages if m["role"] == "system"]
        non_system_messages = [m for m in self.messages if m["role"] != "system"]

        if len(system_messages) > self.max_context_length:
            non_system_messages = non_system_messages[-self.max_context_length:]

        self.messages = system_messages + non_system_messages
        logger.info(f"대화 기록을 {len(self.messages)}개로 제한함")

    def get_messages(self) -> List[Dict[str, Any]]:
        return self.messages

    def get_formatted_messages(self, include_rules : Optional[List[str]] = None) -> List[Dict[str, Any]]:
        if include_rules:
            filtered_messages = [m for m in self.messages if m["role"] in include_rules]
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
            for i in range(len(self.messages) -1, -1, -1):
                if self.messages[i]["role"] == "user":
                    self.messages.insert(i+1, rag_message)
                    break

        else:
            self.messages.append(rag_message)

        self._limit_context()
        logger.info(f"rag 결과 추가됨")

    def clear(self, keep_system: bool = True) -> None:
        if keep_system:
            self.messages = [m for m in self.messages if m["role"] == "system"]
        else:
            self.messages = []
        logger.info(f"대화 내용 청소됨. 현재 대화 기록: {len(self.messages)}개")