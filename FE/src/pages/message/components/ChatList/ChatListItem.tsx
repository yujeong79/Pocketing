import styled from 'styled-components';

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
      <Container>
        <CardImage src={tradeChat.imageUrl} alt="카드 이미지" />
        <ContentWrapper>
          <UserName>{tradeChat.receiverNickname}</UserName>
          <LastMessage>
            {tradeChat.lastMessageContent || '새로운 채팅방이 생성되었습니다.'}
          </LastMessage>
        </ContentWrapper>
        {tradeChat.unreadMessageCount > 0 && (
          <UnreadBadge>{tradeChat.unreadMessageCount}</UnreadBadge>
        )}
      </Container>
    );
  }

  const exchangeChat = chat as ExchangeChat;
  return (
    <Container>
      <DefaultProfileImage />
      <ContentWrapper>
        <UserName>{exchangeChat.otherUser.nickname}</UserName>
        <LastMessage>{exchangeChat.lastMessage}</LastMessage>
      </ContentWrapper>
      {exchangeChat.unreadCount > 0 && <UnreadBadge>{exchangeChat.unreadCount}</UnreadBadge>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const CardImage = styled.img`
  width: 40px;
  height: 64px;
  border-radius: 5px;
  object-fit: cover;
`;

const DefaultProfileImage = styled.div`
  width: 40px;
  height: 64px;
  border-radius: 5px;
  background-color: #e0e0e0;
`;

const ContentWrapper = styled.div`
  flex: 1;
  margin-left: 12px;
  text-align: left;
`;

const UserName = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 4px;
`;

const LastMessage = styled.div`
  font-size: 14px;
  color: #666;
`;

const UnreadBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 10px;
  background-color: #ff6b6b;
  color: white;
  font-size: 12px;
  font-weight: 600;
`;

export default ChatListItem;
