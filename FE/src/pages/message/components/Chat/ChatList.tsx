import ChatItem from '@/pages/message/components/Chat/ChatItem';
import * as S from './ChatListStyle';
import { useNavigate } from 'react-router-dom';
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

interface ChatListProps {
  type: 'trade' | 'exchange';
  tradeChats: TradeChat[];
  exchangeChats: ExchangeChat[];
}

const ChatList = ({ type, tradeChats, exchangeChats }: ChatListProps) => {
  const chats = type === 'trade' ? tradeChats : exchangeChats;
  const navigate = useNavigate();

  if (!chats?.length) {
    return (
      <S.EmptyContainer>
        <S.EmptyText>채팅방이 없습니다.</S.EmptyText>
      </S.EmptyContainer>
    );
  }

  const handleClickChatItem = (roomId: number, nickname: string) => {
    navigate(`/message/${roomId}`, { state: { nickname } });
  };

  return (
    <S.Container>
      {chats.map((chat) => (
        <ChatItem
          key={chat.roomId}
          type={type}
          chat={chat}
          onClick={() =>
            handleClickChatItem(
              chat.roomId,
              type === 'trade'
                ? (chat as TradeChat).receiverNickname
                : (chat as ExchangeChat).otherUser.nickname
            )
          }
        />
      ))}
    </S.Container>
  );
};

export default ChatList;
