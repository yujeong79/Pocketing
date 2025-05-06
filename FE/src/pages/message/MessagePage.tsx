import { useState } from 'react';
import styled from 'styled-components';
import ChatTabs from '@/pages/message/components/ChatTabs/ChatTabs';
import ChatList from '@/pages/message/components/ChatList/ChatList';
import { mockExchangeChats, mockTradeChats } from '@/mocks/message';
import Header from '@/components/common/Header';

const MessagePage = () => {
  const [activeTab, setActiveTab] = useState<'trade' | 'exchange'>('trade');

  return (
    <>
      <Header type="profile" hasBorder={false} />
      <Container>
        <ChatTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <ChatList type={activeTab} tradeChats={mockTradeChats} exchangeChats={mockExchangeChats} />
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
