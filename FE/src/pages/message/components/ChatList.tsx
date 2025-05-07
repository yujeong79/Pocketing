import ChatItem from '@/pages/message/components/ChatItem';
import * as S from './ChatListStyle';
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
      <S.EmptyContainer>
        <S.EmptyText>채팅방이 없습니다.</S.EmptyText>
      </S.EmptyContainer>
    );
  }

  return (
    <S.Container>
      {chats.map((chat) => (
        <ChatItem key={chat.roomId} type={type} chat={chat} />
      ))}
    </S.Container>
  );
};

export default ChatList;
