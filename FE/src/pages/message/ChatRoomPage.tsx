import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/common/Header';
import TradeItem from './components/TradeItem';
import ExchangeItem from './components/ExchangeItem';
import MessageList from './components/ChatRoom/ChatRoomList';
import MessageInput from './components/ChatRoom/ChatRoomInput';
import * as S from './ChatRoomPageStyle';
import { mockChat } from '@/mocks/chat';
import useScrollToBottom from '../../hooks/useScrollToBottom';
import { ChatRoom } from '../../types/chatRoom';

type ChatType = 'TRADE' | 'EXCHANGE';

/**
 * 채팅방 페이지 컴포넌트
 */
const ChatRoomPage: React.FC = () => {
  const location = useLocation();
  const { nickname, chatType = 'TRADE' } =
    (location.state as { nickname?: string; chatType?: ChatType }) || {};

  // 채팅방 상태
  const [messages, setMessages] = useState<ChatRoom[]>(mockChat.result.messagePage.messageList);
  const myUserId = 1; // 임시로 userId 고정
  const opponentNickname = nickname || '카리나사랑해';
  const opponentProfile = mockChat.result.linkedPost.photocard.cardImageUrl;
  const roomId = mockChat.result.messagePage.messageList[0]?.roomId || 8;
  const receiverId = 2; // 임시로 고정

  // Refs
  const chatContainerRef = useRef<HTMLDivElement>(null!);
  const endOfMessagesRef = useRef<HTMLDivElement>(null!);

  // 스크롤 관리 훅
  const { scrollToBottom } = useScrollToBottom(chatContainerRef, [messages]);

  // 메시지 전송 핸들러
  const handleSendMessage = (newMessage: ChatRoom) => {
    setMessages((prev) => [...prev, newMessage]);
    scrollToBottom();
  };

  return (
    <>
      <Header type="chat" title={opponentNickname} />
      <S.Container>
        {chatType === 'TRADE' ? <TradeItem /> : <ExchangeItem />}
        <MessageList
          messages={messages}
          myUserId={myUserId}
          opponentNickname={opponentNickname}
          opponentProfile={opponentProfile}
          chatContainerRef={chatContainerRef}
          endOfMessagesRef={endOfMessagesRef}
        />
        <MessageInput
          myUserId={myUserId}
          receiverId={receiverId}
          roomId={roomId}
          onSendMessage={handleSendMessage}
        />
      </S.Container>
    </>
  );
};

export default ChatRoomPage;
