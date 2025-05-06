import styled from 'styled-components';
import ChatListItem from '@/pages/message/components/ChatList/ChatListItem';

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
  roomId: string;
  otherUser: {
    userId: string;
    nickname: string;
  };
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

interface ChatListProps {
  type: 'trade' | 'exchange';
  tradeChats: TradeChat[];
  exchangeChats: ExchangeChat[];
}

const ChatList = ({ type, tradeChats, exchangeChats }: ChatListProps) => {
  const chats = type === 'trade' ? tradeChats : exchangeChats;

  if (!chats?.length) {
    return (
      <EmptyContainer>
        <EmptyText>채팅방이 없습니다.</EmptyText>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      {chats.map((chat) => (
        <ChatListItem key={chat.roomId} type={type} chat={chat} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const EmptyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const EmptyText = styled.p`
  color: #666;
  font-size: 14px;
`;

export default ChatList;
