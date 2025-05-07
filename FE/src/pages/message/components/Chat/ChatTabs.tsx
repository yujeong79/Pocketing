import * as S from './ChatTapStyle';

interface ChatTabsProps {
  activeTab: 'trade' | 'exchange';
  onTabChange: (tab: 'trade' | 'exchange') => void;
}

const ChatTabs = ({ activeTab, onTabChange }: ChatTabsProps) => {
  return (
    <S.TabContainer activeTab={activeTab}>
      <S.Tab isActive={activeTab === 'trade'} onClick={() => onTabChange('trade')}>
        거래하기
      </S.Tab>
      <S.Tab isActive={activeTab === 'exchange'} onClick={() => onTabChange('exchange')}>
        교환하기
      </S.Tab>
    </S.TabContainer>
  );
};

export default ChatTabs;
