import * as S from './ChatItemStyle';

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

interface ChatListItemProps {
  type: 'trade' | 'exchange';
  chat: TradeChat | ExchangeChat;
  onClick: () => void;
}

const formatTime = (dateStr: string) => {
  if (!dateStr) return '';

  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return '';

  const now = new Date();

  // 오늘 날짜
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  // 어제 날짜
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isToday) {
    // 오늘이면 시간만
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isYesterday) {
    // 어제면 '어제'
    return '어제';
  } else {
    // 그 외는 'MM.DD'
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}.${day}`;
  }
};

const ChatItem = ({ type, chat, onClick }: ChatListItemProps) => {
  if (type === 'trade') {
    const tradeChat = chat as TradeChat;
    return (
      <S.Container onClick={onClick}>
        <S.CardImage src={tradeChat.imageUrl} alt="카드 이미지" />
        <S.ContentWrapper>
          <S.UserName>{tradeChat.receiverNickname}</S.UserName>
          <S.LastMessageRow>
            <S.LastMessage>{tradeChat.lastMessageContent || '새로운 채팅방 생성'}</S.LastMessage>
            <S.LastTime>{formatTime(tradeChat.lastMessageTime)}</S.LastTime>
          </S.LastMessageRow>
        </S.ContentWrapper>
        {tradeChat.unreadMessageCount > 0 && (
          <S.UnreadBadge>{tradeChat.unreadMessageCount}</S.UnreadBadge>
        )}
      </S.Container>
    );
  }

  const exchangeChat = chat as ExchangeChat;
  return (
    <S.Container onClick={onClick}>
      <S.DefaultProfileImage />
      <S.ContentWrapper>
        <S.UserName>{exchangeChat.otherUser.nickname}</S.UserName>
        <S.LastMessage>{exchangeChat.lastMessage}</S.LastMessage>
      </S.ContentWrapper>
      {exchangeChat.unreadCount > 0 && <S.UnreadBadge>{exchangeChat.unreadCount}</S.UnreadBadge>}
    </S.Container>
  );
};

export default ChatItem;
