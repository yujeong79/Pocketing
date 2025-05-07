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

interface ChatListItemProps {
  type: 'trade' | 'exchange';
  chat: TradeChat | ExchangeChat;
}

const ChatListItem = ({ type, chat }: ChatListItemProps) => {
  if (type === 'trade') {
    const tradeChat = chat as TradeChat;
    return (
      <S.Container>
        <S.CardImage src={tradeChat.imageUrl} alt="카드 이미지" />
        <S.ContentWrapper>
          <S.UserName>{tradeChat.receiverNickname}</S.UserName>
          <S.LastMessage>
            {tradeChat.lastMessageContent || '새로운 채팅방이 생성되었습니다.'}
          </S.LastMessage>
        </S.ContentWrapper>
        {tradeChat.unreadMessageCount > 0 && (
          <S.UnreadBadge>{tradeChat.unreadMessageCount}</S.UnreadBadge>
        )}
      </S.Container>
    );
  }

  const exchangeChat = chat as ExchangeChat;
  return (
    <S.Container>
      <S.DefaultProfileImage />
      <S.ContentWrapper>
        <S.UserName>{exchangeChat.otherUser.nickname}</S.UserName>
        <S.LastMessage>{exchangeChat.lastMessage}</S.LastMessage>
      </S.ContentWrapper>
      {exchangeChat.unreadCount > 0 && <S.UnreadBadge>{exchangeChat.unreadCount}</S.UnreadBadge>}
    </S.Container>
  );
};

export default ChatListItem;
