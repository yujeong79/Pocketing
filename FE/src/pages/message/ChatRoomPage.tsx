import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '@/components/common/Header';
import TradeItem from './components/TradeItem';
import ExchangeItem from './components/ExchangeItem';
import MessageList from './components/ChatRoom/ChatRoomList';
import MessageInput from './components/ChatRoom/ChatRoomInput';
import * as S from './ChatRoomPageStyle';
import useScrollToBottom from '@/hooks/useScrollToBottom';
import { ChatRoomDetail } from '@/types/chat';
import { loadMoreMessages } from '@/api/chat';
import WebSocketService from '@/services/websocket';
import { useAuth } from '@/hooks/useAuth';
import { PostDetail } from '@/types/post';
import { fetchPostDetail } from '@/api/posts/post';
import { useChatStore } from '@/store/chatStore';
import { useChatSocket } from '@/hooks/useChatSocket';

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
  const { messages, setMessages, addMessage, page, setPage, hasMore, setHasMore } = useChatStore();
  const chatRoomDetail = useMemo(() => initialChatRoomDetail || null, [initialChatRoomDetail]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const webSocketService = WebSocketService.getInstance();

  const { scrollToBottom } = useScrollToBottom(chatContainerRef, [messages]);
  const [postDetail, setPostDetail] = useState<PostDetail | null>(null);

  // WebSocket 연결 및 메시지 핸들러 등록
  useChatSocket({
    roomId,
    token: token || '',
    onMessage: (msg) => {
      addMessage(msg);
      scrollToBottom();
    },
  });

  useEffect(() => {
    if (!roomId || !token || !chatRoomDetail) return;
    // 최초 입장시에만 메시지 초기화
    setMessages(chatRoomDetail.messagePage.messageList);
    setHasMore(chatRoomDetail.messagePage.hasNext);
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, token]);

  useEffect(() => {
    const postId = chatRoomDetail?.linkedPost?.postId;
    if (postId && !postDetail) {
      // postId로 postDetail API 호출
      fetchPostDetail(postId).then(setPostDetail);
    }
  }, [chatRoomDetail?.linkedPost?.postId, postDetail]);

  const handleLoadMore = async () => {
    if (!roomId || !hasMore) return;

    try {
      const response = await loadMoreMessages(Number(roomId), page + 1);
      if (response.isSuccess) {
        setMessages([...response.result.messageList, ...messages]);
        setPage(page + 1);
        setHasMore(response.result.hasNext);
      }
    } catch (error) {
      console.error('이전 메시지 로드 실패:', error);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!roomId || !user) return;
    // WebSocket으로 전송
    webSocketService.sendMessage(Number(roomId), content);
    // UI에 바로 반영
    addMessage({
      messageId: Date.now(),
      roomId: Number(roomId),
      senderId: user.userId,
      receiverId: null,
      messageContent: content,
      createdAt: new Date().toISOString(),
    });
    scrollToBottom();
  };

  if (!user) return null;

  const renderTradeOrExchangeItem = () => {
    if (!chatRoomDetail) return null;

    if (chatType === 'TRADE' && chatRoomDetail.linkedPost) {
      const isMyPost = postDetail?.isMine === true;
      return (
        <TradeItem
          linkedPost={chatRoomDetail.linkedPost}
          roomId={Number(roomId)}
          isMyPost={isMyPost}
        />
      );
    }

    if (chatType === 'EXCHANGE' && chatRoomDetail.linkedExchange) {
      return <ExchangeItem linkedExchange={chatRoomDetail.linkedExchange} />;
    }

    return null;
  };

  const opponent = chatRoomDetail?.participants.find((p) => !p.isMyInfo);
  const opponentProfile = opponent?.profileImageUrl || '/default-profile.png';
  const opponentNickname = opponent?.nickname || '';

  return (
    <>
      <Header type="chat" title={nickname} />
      <S.Container>
        {renderTradeOrExchangeItem()}
        <MessageList
          messages={messages}
          myUserId={user.userId}
          opponentNickname={opponentNickname}
          opponentProfile={opponentProfile}
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
