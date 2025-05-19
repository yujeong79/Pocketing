import React, { RefObject } from 'react';
import * as S from '../../ChatRoomPageStyle';
import { ChatMessage } from '@/types/chat';
import ChatRoomItem from '@/pages/message/components/ChatRoom/ChatRoomItem';

interface MessageListProps {
  messages: ChatMessage[];
  myUserId: number;
  opponentNickname: string;
  chatContainerRef: RefObject<HTMLDivElement>;
  endOfMessagesRef: RefObject<HTMLDivElement>;
  onLoadMore: () => void;
  hasMore: boolean;
  opponentProfile: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  myUserId,
  opponentNickname,
  chatContainerRef,
  endOfMessagesRef,
  onLoadMore,
  hasMore,
  opponentProfile,
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
        const prevMessage = sortedMessages[index - 1];
        let showTime = false;

        if (!prevMessage) {
          //첫 메시지는 항상 시간 표시
          showTime = true;
        } else {
          const isSameUser = prevMessage.senderId === message.senderId;
          const prevTime = new Date(prevMessage.createdAt).getTime();
          const currTime = new Date(message.createdAt).getTime();
          const diffMinutes = Math.abs(currTime - prevTime) / 1000 / 60;

          //같은 사람이더라도 1분 이상 차이나면 시간 표시
          if (!isSameUser || diffMinutes >= 1) {
            showTime = true;
          }
        }

        const isUser = message.senderId === myUserId;
        const continued = index > 0 && sortedMessages[index - 1].senderId === message.senderId;
        const prevDate = index > 0 ? sortedMessages[index - 1].createdAt : '';
        const currDate = message.createdAt.slice(0, 10); // 'YYYY-MM-DD'
        const showDate = !prevDate || prevDate.slice(0, 10) !== currDate;

        return (
          <React.Fragment key={message.messageId}>
            {showDate &&
              (() => {
                const dateObj = new Date(currDate);
                const days = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
                const dayStr = days[dateObj.getDay()];
                return (
                  <S.DateDivider>
                    {currDate.replace(/-/g, '. ')} {dayStr}
                  </S.DateDivider>
                );
              })()}
            <ChatRoomItem
              message={message}
              isUser={isUser}
              continued={continued}
              opponentNickname={opponentNickname}
              opponentProfile={opponentProfile}
              showTime={showTime}
            />
          </React.Fragment>
        );
      })}
      <div ref={endOfMessagesRef} />
    </S.ChatContainer>
  );
};

export default MessageList;
