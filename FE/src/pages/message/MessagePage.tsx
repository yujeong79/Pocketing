import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatTabs from '@/pages/message/components/Chat/ChatTabs';
import ChatList from '@/pages/message/components/Chat/ChatList';
import Header from '@/components/common/Header';
import { getExchangeChatRooms, getPostChatRooms } from '@/api/chat';
import { ChatRoom } from '@/types/chat';
import { useEffect, useState } from 'react';

interface TradeChat {
  roomId: number;
  receiverId: number;
  receiverNickname: string;
  postId: number;
  exchangeId: null;
  imageUrl: string;
  lastMessageContent: string;
  unreadMessageCount: number;
}

interface ExchangeChat {
  roomId: number;
  otherUser: {
    userId: string;
    nickname: string;
  };
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

interface MessagePageProps {
  type: 'trade' | 'exchange';
}

const convertToTradeChat = (chatRoom: ChatRoom): TradeChat | null => {
  if (chatRoom.postId === null) return null;
  return {
    roomId: chatRoom.roomId,
    receiverId: chatRoom.receiverId,
    receiverNickname: chatRoom.receiverNickname,
    postId: chatRoom.postId,
    exchangeId: null,
    imageUrl: chatRoom.imageUrl,
    lastMessageContent: chatRoom.lastMessageContent,
    unreadMessageCount: chatRoom.unreadMessageCount,
  };
};

const convertToExchangeChat = (chatRoom: ChatRoom): ExchangeChat => {
  return {
    roomId: chatRoom.roomId,
    otherUser: {
      userId: chatRoom.receiverId.toString(),
      nickname: chatRoom.receiverNickname,
    },
    lastMessage: chatRoom.lastMessageContent,
    unreadCount: chatRoom.unreadMessageCount,
    updatedAt: new Date().toISOString(), // API에서 제공하지 않는 값이므로 현재 시간으로 대체
  };
};

const MessagePage = ({ type }: MessagePageProps) => {
  const navigate = useNavigate();
  const [tradeChats, setTradeChats] = useState<TradeChat[]>([]);
  const [exchangeChats, setExchangeChats] = useState<ExchangeChat[]>([]);

  const handleTabChange = (type: 'trade' | 'exchange') => {
    navigate(`/message/${type}`);
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        if (type === 'trade') {
          const response = await getPostChatRooms();
          if (response.isSuccess) {
            const validTradeChats = response.result
              .map(convertToTradeChat)
              .filter((chat): chat is TradeChat => chat !== null);
            setTradeChats(validTradeChats);
          }
        } else {
          const response = await getExchangeChatRooms();
          if (response.isSuccess) {
            const exchangeChats = response.result.map(convertToExchangeChat);
            setExchangeChats(exchangeChats);
          }
        }
      } catch (error) {
        console.error('채팅방 목록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchChatRooms();
  }, [type]);

  return (
    <>
      <Header type="profile" hasBorder={false} />
      <Container>
        <ChatTabs activeTab={type} onTabChange={handleTabChange} />
        <ChatList type={type} tradeChats={tradeChats} exchangeChats={exchangeChats} />
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default MessagePage;
