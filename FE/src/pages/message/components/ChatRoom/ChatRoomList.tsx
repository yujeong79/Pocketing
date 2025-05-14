import React, { RefObject } from 'react';
import * as S from '../../ChatRoomPageStyle';
import { ChatMessage } from '@/types/chat';
import ChatRoomItem from './ChatRoomItem';

interface MessageListProps {
  messages: ChatMessage[];
  myUserId: number;
  opponentNickname: string;
  chatContainerRef: RefObject<HTMLDivElement>;
  endOfMessagesRef: RefObject<HTMLDivElement>;
  onLoadMore: () => void;
  hasMore: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  myUserId,
  opponentNickname,
  chatContainerRef,
  endOfMessagesRef,
  onLoadMore,
  hasMore,
}) => {
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    if (scrollTop === 0 && hasMore) {
      onLoadMore();
    }
  };

  // 메시지 시간순으로 정렬
  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return (
    <S.ChatContainer ref={chatContainerRef} onScroll={handleScroll}>
      {hasMore && <S.LoadMoreButton onClick={onLoadMore}>이전 메시지 더보기</S.LoadMoreButton>}
      {sortedMessages.map((message, index) => {
        const isUser = message.senderId === myUserId;
        const continued = index > 0 && sortedMessages[index - 1].senderId === message.senderId;

        return (
          <ChatRoomItem
            key={message.messageId}
            message={message}
            isUser={isUser}
            continued={continued}
            opponentNickname={opponentNickname}
            opponentProfile="/default-profile.png"
          />
        );
      })}
      <div ref={endOfMessagesRef} />
    </S.ChatContainer>
  );
};

export default MessageList;
