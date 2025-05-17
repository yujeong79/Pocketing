import logging
import json
from typing import Dict, List, Any, Optional, Tuple
import asyncio
from datetime import datetime

from app.utils.context import MessageContext
from app.services.rag import RAGService
from app.services.llm import LLMService
from app.services.cache import RedisCache
from app.models.schemas import (
    ChatRequest, ChatResponse, ChatResponseResult, ChatResponseMeta,
    ErrorResponse, ErrorCode, PhotoCardResult
)

logger = logging.getLogger(__name__)


class ChatService:
    def __init__(self):
        self.rag_service = RAGService()
        self.llm_service = LLMService()
        self.cache = RedisCache()
        logger.info("챗봇 서비스 초기화 완료")

    async def process_message(self, request: ChatRequest) -> Dict[str, Any]:
        try:
            user_id = request.user_id
            user_query = request.chat_message
            message_id = request.chat_message_id

            logger.info(f"사용자 {user_id}의 메시지 처리 시작: {user_query}")

            context_json = self.cache.get_chat_context(user_id)
            if context_json:
                context = MessageContext.from_json(context_json)
                logger.debug(f"사용자 {user_id}의 컨텍스트 로드 완료")
            else:
                context = MessageContext(user_id=user_id)
                logger.debug(f"사용자 {user_id}의 새 컨텍스트 생성")

            if message_id is not None:
                if context.current_message_id != message_id:
                    logger.warning(f"메시지 ID 불일치: 클라이언트={message_id}, 서버={context.current_message_id}")

            message_number = context.add_message("user", user_query)
            logger.debug(f"사용자 메시지 추가됨: 메시지 ID {message_number}")

            is_photocard_related = self.llm_service.is_photocard_related_query(user_query)

            if not is_photocard_related:
                logger.info("일상적인 대화 감지됨, 포토카드 검색 건너뜀")
                metadata_list = []
                post_results = []
            else:
                metadata_list, post_results = self.rag_service.search_photocards(user_query, n_results=5)
                logger.info(f"포토카드 검색 완료: {len(metadata_list)}개 결과, {len(post_results)}개 판매글 정보")

            rag_result = self.rag_service.rag_photocard_for_llm(metadata_list, post_results)

            messages = context.get_formatted_messages(include_roles=["user", "assistant"])

            llm_response = self.llm_service.generate_response_with_photocard_info(
                user_query=user_query,
                photocard_info=rag_result,
                chat_history=messages[:-1]
            )
            logger.debug(f"LLM 응답 생성 완료: {llm_response[:50]}...")
            context.add_message("assistant", llm_response)

            if post_results:
                context.add_photocard_results(context.current_message_id, post_results)
                logger.debug(f"포토카드 결과 저장됨: {len(post_results)}개")
            self.cache.save_chat_context(user_id, context.to_json(), expiry=3600)
            logger.debug(f"사용자 {user_id}의 컨텍스트 저장 완료")

            response_meta = ChatResponseMeta(
                user_id=user_id,
                total_results=len(post_results),
                in_response_to=context.current_message_id,
                new_chat_message_id=context.current_message_id + 1
            )

            response_result = ChatResponseResult(
                text=llm_response,
                photocards=post_results,
                meta=response_meta
            )

            response = ChatResponse(
                status="SUCCESS",
                code=1000,
                message="성공",
                result=response_result
            )

            logger.info(f"사용자 {user_id}의 메시지 처리 완료")
            return response.dict()

        except Exception as e:
            logger.error(f"메시지 처리 중 오류 발생: {str(e)}", exc_info=True)
            error_response = ErrorResponse(
                status="ERROR",
                code=5000,
                message="서버 내부 오류가 발생했습니다.",
                error_type=ErrorCode.SERVER_ERROR
            )
            return error_response.dict()

    def _format_photocard_results(self, metadata_list: List[Dict[str, Any]],
                                  post_results: List[PhotoCardResult]) -> str:
        if not metadata_list:
            return "검색 결과가 없습니다."

        result_map = {}
        for metadata in metadata_list:
            result_map[metadata["card_id"]] = {
                "card_info": metadata,
                "post_info": None,
                "similarity": metadata.get("semantic_similarity", 0)  # 의미적 유사도 점수
            }

        for post_result in post_results:
            if post_result.card_id in result_map:
                result_map[post_result.card_id]["post_info"] = post_result

        formatted_info = []
        formatted_info.append(f"총 {len(metadata_list)}개의 포토카드를 찾았습니다.")

        sorted_results = sorted(result_map.items(), key=lambda x: x[1]["similarity"], reverse=True)

        for i, (card_id, data) in enumerate(sorted_results):
            card_info = data["card_info"]
            post_info = data["post_info"]
            similarity = data["similarity"]

            card_text = (
                f"포토카드 {i + 1}:\n"
                f"- 그룹: {card_info['group_name']}\n"
                f"- 멤버: {card_info['member_name']}\n"
                f"- 앨범: {card_info['album_name']}\n"
                f"- 태그: {', '.join(card_info['tag'])}\n"
                f"- 유사도: {similarity:.2f}\n"
            )

            if post_info and post_info.cheapest_post.post_id:
                card_text += (
                    f"- 최저가: {post_info.cheapest_post.price}원\n"
                    f"- 판매자: {post_info.cheapest_post.nickname}\n"
                )
            else:
                card_text += "- 현재 판매 중인 포토카드가 없습니다.\n"

            formatted_info.append(card_text)

        return "\n".join(formatted_info)

    async def clear_chat_history(self, user_id: int) -> bool:
        try:
            result = self.cache.clear_chat_context(user_id)
            logger.info(f"사용자 {user_id}의 채팅 기록 삭제: {'성공' if result else '실패'}")
            return result
        except Exception as e:
            logger.error(f"채팅 기록 삭제 중 오류 발생: {str(e)}")
            return False