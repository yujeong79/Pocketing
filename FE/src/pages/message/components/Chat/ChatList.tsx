import ChatItem from '@/pages/message/components/Chat/ChatItem';
import * as S from './ChatListStyle';
import { useNavigate } from 'react-router-dom';
import { enterChatRoom } from '@/api/chat';

interface TradeChat {
  roomId: number;
  receiverId: number;
  receiverNickname: string;
  postId: number;
  exchangeId: null;
  imageUrl: string;
  lastMessageContent: string;
  unreadMessageCount: number;
  lastMessageTime: string;
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

  const handleClickChatItem = async (roomId: number, nickname: string) => {
    try {
      // 채팅방 입장 API 호출
      const response = await enterChatRoom(roomId);

      if (response.isSuccess) {
        // 채팅방 상세 페이지로 이동
        navigate(`/message/${roomId}`, {
          state: {
            nickname,
            chatType: type === 'trade' ? 'TRADE' : 'EXCHANGE',
            chatRoomDetail: response.result,
          },
        });
      } else {
        console.error('채팅방 입장 실패:', response.message);
      }
    } catch (error) {
      console.error('채팅방 입장 중 오류 발생:', error);
    }
  };

  const sortedChats = chats.slice().sort((a, b) => {
    if (type === 'trade') {
      // TradeChat의 lastMessageTime 기준 최신순 정렬
      return (
        new Date((b as TradeChat).lastMessageTime).getTime() -
        new Date((a as TradeChat).lastMessageTime).getTime()
      );
    } else {
      // ExchangeChat은 updatedAt 사용
      return (
        new Date((b as ExchangeChat).updatedAt).getTime() -
        new Date((a as ExchangeChat).updatedAt).getTime()
      );
    }
  });

  return (
    <S.Container>
      {sortedChats.map((chat) => (
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
