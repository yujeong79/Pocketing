import React, { RefObject } from 'react';
import * as S from '@/pages/message/ChatRoomPageStyle';
import ChatRoomItem from '@/pages/message/components/ChatRoom/ChatRoomItem';
import { ChatRoom } from '@/types/chatRoom';

interface ChatRoomListProps {
  messages: ChatRoom[];
  myUserId: number;
  opponentNickname: string;
  opponentProfile: string;
  chatContainerRef: RefObject<HTMLDivElement>;
  endOfMessagesRef: RefObject<HTMLDivElement>;
}

/**
 * 메시지 목록 컴포넌트
 */
const ChatRoomList: React.FC<ChatRoomListProps> = ({
  messages,
  myUserId,
  opponentNickname,
  opponentProfile,
  chatContainerRef,
  endOfMessagesRef,
}) => {
  return (
    <S.ChatContainer ref={chatContainerRef}>
      {messages.map((message, idx) => {
        const isUser = message.senderId === myUserId;
        const prev = messages[idx - 1];
        const continued = prev && prev.senderId === message.senderId;

        return (
          <ChatRoomItem
            key={message.messageId}
            message={message}
            isUser={isUser}
            continued={continued}
            opponentNickname={opponentNickname}
            opponentProfile={opponentProfile}
          />
        );
      })}

      {/* 스크롤 타겟 */}
      <div ref={endOfMessagesRef} style={{ height: 1 }} />
    </S.ChatContainer>
  );
};

export default ChatRoomList;
