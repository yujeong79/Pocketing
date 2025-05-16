import logging
import json
from typing import Dict, List, Any, Optional
import requests
from app.config.settings import settings
from app.models.schemas import ErrorCode, ErrorResponse

logger = logging.getLogger(__name__)


class LLMService:

    def __init__(self):
        self.model = settings.LLM_MODEL
        self.temperature = settings.LLM_TEMPERATURE
        self.api_key = settings.OPENAI_API_KEY
        self.api_url = f"{settings.OPENAI_API_BASE}/chat/completions"
        self.headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        logger.info(f"LLM 서비스 초기화 완료. 모델: {self.model}, 온도: {self.temperature}") \


    def generate_response(self, messages: List[Dict[str, str]],
                          system_prompt: Optional[str] = None,
                          response_format: Optional[Dict[str, str]] = None) -> str:
        try:
            all_messages = []
            if system_prompt:
                all_messages.append({"role": "system", "content": system_prompt})
            all_messages.extend(messages)

            payload = {
                "model": self.model,
                "messages": all_messages,
                "temperature": self.temperature
            }

            if response_format:
                payload["response_format"] = response_format

            response = requests.post(
                self.api_url,
                headers=self.headers,
                json=payload,
                timeout=30
            )
            response.raise_for_status()

            result = response.json()
            if "choices" in result and len(result["choices"]) > 0:
                return result["choices"][0]["message"]["content"].strip()
            else:
                logger.error("LLM 응답에 choices 필드가 없거나 비어 있음")
                return "죄송합니다. 응답을 생성하는 중에 오류가 발생했습니다."

        except requests.exceptions.RequestException as e:
            logger.error(f"LLM API 요청 실패: {str(e)}")
            return "죄송합니다. 서버와 통신하는 중에 오류가 발생했습니다."
        except Exception as e:
            logger.error(f"응답 생성 중 오류 발생: {str(e)}")
            return "죄송합니다. 응답을 생성하는 중에 오류가 발생했습니다."

    def generate_response_with_photocard_info(self,
                                              user_query: str,
                                              photocard_info: str,
                                              chat_history: Optional[List[Dict[str, str]]] = None) -> str:
        try:
            system_prompt = f"""
            당신은 K-POP 포토카드 거래 플랫폼 '포켓팅'의 챗봇입니다. 사용자가 포토카드를 검색하면 관련 포토카드와 최저가 판매글 정보를 제공하는 역할을 합니다.

            # 응답 방식
            1. 사용자 질문을 분석하여 검색된 포토카드 수를 언급하세요. (예: "윈터의 양갈래 포토카드를 3장 찾았습니다.")
            2. 중요한 특징(그룹명, 멤버명, 앨범명, 특징 등)을 간결하게 설명하세요.
            3. 모든 포토카드의 최저가 정보를 언급하세요. 판매글이 있는 경우 가격과 판매자를, 없는 경우 "현재 판매 중인 글이 없습니다"라고 안내하세요.
            4. 더 자세한 내용은 판매글에서 확인할 수 있다고 안내하세요.

            # 유의사항
            - 사용자가 구체적인 포토카드를 물어보면 (예: "양갈래 윈터"), 관련 포토카드 정보를 중심으로 답변하세요.
            - 사용자가 가격에 대해 물어보면 최저가 정보를 강조하세요.
            - 사용자가 구매 방법을 물어보면 판매글에서 직접 거래할 수 있다고 안내하세요.
            - 판매글이 없는 포토카드도 정보는 제공하되, 현재 판매 중인 글이 없다고 안내하세요.
            - 짧고 친절하게 대화체로 응답하세요.

            제공된 포토카드 정보:
            {photocard_info}
            """

            messages = []
            if chat_history:
                messages.extend(chat_history)
            messages.append({"role": "user", "content": user_query})
            return self.generate_response(messages, system_prompt=system_prompt)

        except Exception as e:
            logger.error(f"포토카드 정보를 포함한 응답 생성 중 오류 발생: {str(e)}")
            return "죄송합니다. 응답을 생성하는 중에 오류가 발생했습니다."