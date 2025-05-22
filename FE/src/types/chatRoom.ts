/**
 * 메시지 타입 정의
 */
export interface ChatRoom {
  messageId: number;
  roomId: number;
  senderId: number;
  receiverId: number | null;
  messageContent: string;
  createdAt: string;
}

/**
 * 메시지 속성 (UI 관련)
 */
export interface ChatRoomProps {
  message: ChatRoom;
  isUser: boolean;
  continued: boolean;
  opponentNickname: string;
  opponentProfile: string;
}

/**
 * 채팅방 컨텍스트
 */
export interface ChatRoomContext {
  myUserId: number;
  opponentId?: number;
  opponentNickname: string;
  opponentProfile: string;
}
