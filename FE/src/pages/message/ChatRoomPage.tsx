import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import TradeItem from './components/TradeItem';
import ExchangeItem from './components/ExchangeItem';
import MessageList from './components/ChatRoom/ChatRoomList';
import MessageInput from './components/ChatRoom/ChatRoomInput';
import * as S from './ChatRoomPageStyle';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { ChatMessage, ChatRoomDetail } from '@/types/chat';
import { loadMoreMessages } from '@/api/chat';
import WebSocketService from '@/services/websocket';
import { useAuth } from '@/hooks/useAuth';

type ChatType = 'TRADE' | 'EXCHANGE';

/**
 * 채팅방 페이지 컴포넌트
 */
const ChatRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const location = useLocation();
  const {
    nickname,
    chatType = 'TRADE',
    chatRoomDetail: initialChatRoomDetail,
  } = (location.state as {
    nickname?: string;
    chatType?: ChatType;
    chatRoomDetail?: ChatRoomDetail;
  }) || {};

  const { user, token } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const chatRoomDetail = useMemo(() => initialChatRoomDetail || null, [initialChatRoomDetail]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const webSocketService = WebSocketService.getInstance();

  const { scrollToBottom } = useScrollToBottom(chatContainerRef, [messages]);

  useEffect(() => {
    const initializeChat = async () => {
      if (!roomId || !token) return;

      try {
        // 웹소켓 연결
        await webSocketService.connect(token);

        // 초기 메시지 및 채팅방 정보 설정
        if (chatRoomDetail) {
          setMessages(chatRoomDetail.messagePage.messageList);
          setHasMore(chatRoomDetail.messagePage.hasNext);
          scrollToBottom();
        }

        // 메시지 핸들러 등록
        const messageHandler = (message: ChatMessage) => {
          setMessages((prev) => [...prev, message]);
          scrollToBottom();
        };
        webSocketService.addMessageHandler(messageHandler);

        return () => {
          webSocketService.removeMessageHandler(messageHandler);
          webSocketService.disconnect();
        };
      } catch (error) {
        console.error('채팅방 초기화 실패:', error);
      }
    };

    initializeChat();
  }, [roomId, token, webSocketService, scrollToBottom, chatRoomDetail]);

  const handleLoadMore = async () => {
    if (!roomId || !hasMore) return;

    try {
      const response = await loadMoreMessages(Number(roomId), page + 1);
      if (response.isSuccess) {
        setMessages((prev) => [...response.result.messageList, ...prev]);
        setPage((prev) => prev + 1);
        setHasMore(response.result.hasNext);
      }
    } catch (error) {
      console.error('이전 메시지 로드 실패:', error);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!roomId || !user) return;

    webSocketService.sendMessage(Number(roomId), content);
  };

  if (!user) return null;

  const renderTradeOrExchangeItem = () => {
    if (!chatRoomDetail) return null;

    if (chatType === 'TRADE' && chatRoomDetail.linkedPost) {
      return <TradeItem linkedPost={chatRoomDetail.linkedPost} />;
    }

    if (chatType === 'EXCHANGE' && chatRoomDetail.linkedExchange) {
      return <ExchangeItem linkedExchange={chatRoomDetail.linkedExchange} />;
    }

    return null;
  };

  return (
    <>
      <Header type="chat" title={nickname} />
      <S.Container>
        {renderTradeOrExchangeItem()}
        <MessageList
          messages={messages}
          myUserId={user.userId}
          opponentNickname={nickname || ''}
          chatContainerRef={chatContainerRef as React.RefObject<HTMLDivElement>}
          endOfMessagesRef={endOfMessagesRef as React.RefObject<HTMLDivElement>}
          onLoadMore={handleLoadMore}
          hasMore={hasMore}
        />
        <MessageInput onSendMessage={handleSendMessage} />
      </S.Container>
    </>
  );
};

export default ChatRoomPage;
