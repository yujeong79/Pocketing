import styled from 'styled-components';

interface ChatTabsProps {
  activeTab: 'trade' | 'exchange';
  onTabChange: (tab: 'trade' | 'exchange') => void;
}

const ChatTabs = ({ activeTab, onTabChange }: ChatTabsProps) => {
  return (
    <TabContainer>
      <Tab isActive={activeTab === 'trade'} onClick={() => onTabChange('trade')}>
        거래하기
      </Tab>
      <Tab isActive={activeTab === 'exchange'} onClick={() => onTabChange('exchange')}>
        교환하기
      </Tab>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 16px;
  font-size: 16px;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  color: ${({ isActive }) => (isActive ? '#FF6B6B' : '#666')};
  background: none;
  border: none;
  border-bottom: 2px solid ${({ isActive }) => (isActive ? '#FF6B6B' : 'transparent')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #ff6b6b;
  }
`;

export default ChatTabs;
