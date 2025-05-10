import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatTabs from '@/pages/message/components/Chat/ChatTabs';
import ChatList from '@/pages/message/components/Chat/ChatList';
import { mockExchangeChats, mockTradeChats } from '@/mocks/message';
import Header from '@/components/common/Header';

interface MessagePageProps {
  type: 'trade' | 'exchange';
}

const MessagePage = ({ type }: MessagePageProps) => {
  const navigate = useNavigate();

  const handleTabChange = (type: 'trade' | 'exchange') => {
    navigate(`/message/${type}`);
  };

  return (
    <>
      <Header type="profile" hasBorder={false} />
      <Container>
        <ChatTabs activeTab={type} onTabChange={handleTabChange} />
        <ChatList type={type} tradeChats={mockTradeChats} exchangeChats={mockExchangeChats} />
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
