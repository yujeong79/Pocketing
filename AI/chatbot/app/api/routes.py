from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.responses import JSONResponse
import logging
from typing import Dict, Any

from app.services.chat import ChatService
from app.models.schemas import ChatRequest, ErrorCode

logger = logging.getLogger(__name__)
router = APIRouter()
chat_service = ChatService()

class ConnectionManager:
    def __init__(self):
        self.conneted_users: Dict[int, WebSocket] = {}

    async def connect(self, websocket: WebSocket, user_id: int):
        await websocket.accept()
        self.conneted_users[user_id] = websocket
        logger.info(f"사용자 {user_id} 연결됨. 현재 연결 수: {len(self.conneted_users)}")

    def disconnect(self, user_id: int):
        if user_id in self.conneted_users:
            del self.conneted_users[user_id]
            logger.info(f"사용자 {user_id} 연결 종료. 현재 연결 수: {len(self.conneted_users)}")

    async def send_message(self, user_id: int, message: Dict[str, Any]):
        if user_id in self.conneted_users:
            await self.conneted_users[user_id].send_json(message)
            logger.debug(f"사용자 {user_id}에게 메시지 전송 완료")

manager = ConnectionManager()

@router.websocket("/ws/chatbot")
async def websocket_chat(websocket: WebSocket):
    user_id = None
    try:
        await websocket.accept()
        await websocket.send_json({
            "status": "SUCCESS",
            "code": 1000,
            "message": "웹소켓 연결이 성공적으로 설정되었습니다.",
            "type": "CONNECTION_ESTABLISHED"
        })

        try:
            while True:
                data = await websocket.receive_json()
                user_id = data.get("user_id")

                if not user_id:
                    await websocket.send_json({
                        "status": "ERROR",
                        "code": 4000,
                        "message": "user_id가 필요합니다",
                        "error_type": ErrorCode.INVALID_REQUEST
                    })
                    continue

                if user_id not in manager.conneted_users:
                    manager.conneted_users[user_id] = websocket
                    logger.info(f"사용자 {user_id} 연결됨. 현재 연결 수: {len(manager.conneted_users)}")
                logger.info(f"사용자 {user_id}로부터 메시지 수신: {data}")

                try:
                    request = ChatRequest(
                        user_id=user_id,
                        chat_message=data.get("chat_message"),
                        chat_message_id=data.get("chat_message_id")
                    )
                except Exception as e:
                    await websocket.send_json({
                        "status": "ERROR",
                        "code": 4000,
                        "message": f"잘못된 요청 형식입니다: {str(e)}",
                        "error_type": ErrorCode.PARSING_ERROR
                    })
                    continue
                response = await chat_service.process_message(request)
                await websocket.send_json(response)

        except WebSocketDisconnect:
            if user_id is not None:
                manager.disconnect(user_id)
                logger.info(f"사용자 {user_id}의 웹소켓 연결이 종료되었습니다.")

    except Exception as e:
        logger.error(f"웹소켓 처리 중 오류 발생: {str(e)}", exc_info=True)
        try:
            await websocket.send_json({
                "status": "ERROR",
                "code": 5000,
                "message": f"서버 내부 오류가 발생했습니다: {str(e)}",
                "error_type": ErrorCode.SERVER_ERROR
            })
        except:
            pass
        if user_id is not None:
            manager.disconnect(user_id)

@router.delete("/api/chat/history/{user_id}")
async def clear_chat_history(user_id: int):
    try:
        result = await chat_service.clear_chat_history(user_id)
        if result:
            return JSONResponse(
                status_code=200,
                content={
                    "status": "SUCCESS",
                    "code": 1000,
                    "message": "채팅 기록이 성공적으로 삭제되었습니다."
                }
            )
        else:
            return JSONResponse(
                status_code=404,
                content={
                    "status": "ERROR",
                    "code": 4004,
                    "message": "채팅 기록을 찾을 수 없습니다.",
                    "error_type": ErrorCode.NOT_FOUND
                }
            )
    except Exception as e:
        logger.error(f"채팅 기록 삭제 중 오류 발생: {str(e)}", exc_info=True)
        return JSONResponse(
            status_code=500,
            content={
                "status": "ERROR",
                "code": 5000,
                "message": f"서버 내부 오류가 발생했습니다: {str(e)}",
                "error_type": ErrorCode.SERVER_ERROR
            }
        )

@router.get("/api/health")
async def health_check():
    return {
        "status": "SUCCESS",
        "code": 1000,
        "message": "서버가 정상적으로 동작 중입니다.",
        "version": "1.0.0"
    }