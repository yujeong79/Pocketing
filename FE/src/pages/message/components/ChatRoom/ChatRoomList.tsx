import React, { RefObject } from 'react';
import * as S from '../../ChatRoomPageStyle';
import { ChatMessage } from '@/types/chat';

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

  return (
    <S.ChatContainer ref={chatContainerRef} onScroll={handleScroll}>
      {hasMore && <button onClick={onLoadMore}>이전 메시지 더보기</button>}
      {messages.map((message, index) => {
        const isUser = message.senderId === myUserId;
        const showProfile =
          !isUser && (!messages[index - 1] || messages[index - 1].senderId !== message.senderId);
        const continued = index > 0 && messages[index - 1].senderId === message.senderId;

        return (
          <S.MessageWrapper key={message.messageId} isUser={isUser} continued={continued}>
            {!isUser && showProfile && (
              <>
                <S.ProfileImage src="/default-profile.png" alt="프로필" />
                <div>
                  <S.NickNameText isUser={isUser}>{opponentNickname}</S.NickNameText>
                </div>
              </>
            )}
            <S.MessageText isUser={isUser}>{message.messageContent}</S.MessageText>
          </S.MessageWrapper>
        );
      })}
      <div ref={endOfMessagesRef} />
    </S.ChatContainer>
  );
};

export default MessageList;
