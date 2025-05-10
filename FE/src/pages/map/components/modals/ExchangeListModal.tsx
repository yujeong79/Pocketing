import React from 'react';

import * as S from './ExchangeListModalStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import { RefreshIcon2 } from '@/assets/assets';
import PocketCallButton from '../buttons/PocketCallButton';

interface ExchangeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredList: any[];
  pocketCallCount: number;
  onPocketCall: () => void;
  onRefreshClick: () => void;
  spinning: boolean;
}

const ExchangeListModal = ({
  isOpen,
  onClose,
  filteredList,
  pocketCallCount,
  onPocketCall,
  onRefreshClick,
  spinning,
}: ExchangeListModalProps) => {
  return (
    <SlideUpModal header="거래중인 포케터" isOpen={isOpen} onClose={onClose}>
      <S.ExchangeModalSecondHeader>
        <S.ExchangeModalSecondHeaderText>
          근처에서 교환을 신청할 포케터를 {`\n`}선택해주세요
        </S.ExchangeModalSecondHeaderText>
        <S.ExchangeListRefreshButton
          src={RefreshIcon2}
          onClick={onRefreshClick}
          $spinning={spinning}
        />
      </S.ExchangeModalSecondHeader>
      <S.ExchangeModalThirdHeader>
        <S.ExchangeModalThirdHeaderLeft>
          포켓콜은 3분마다 최대 5번 보낼 수 있어요
        </S.ExchangeModalThirdHeaderLeft>
        <S.ExchangeModalThirdHeaderRight $isMax={pocketCallCount === 5}>
          {pocketCallCount} /5
        </S.ExchangeModalThirdHeaderRight>
      </S.ExchangeModalThirdHeader>
      <S.ExchangeUserListContainer>
        {filteredList.map((user, index) => (
          <React.Fragment key={user.userId}>
            <S.ExchangeUserList>
              <S.ExchangeUserLeft>
                <S.ExchangeCardImage src={user.card.imageUrl} />
                <S.ExchangeUserName>{user.nickname}</S.ExchangeUserName>
              </S.ExchangeUserLeft>
              <PocketCallButton onClick={onPocketCall} disabled={pocketCallCount >= 5} />
            </S.ExchangeUserList>
            {index !== filteredList.length - 1 && <S.Divider />}
          </React.Fragment>
        ))}
      </S.ExchangeUserListContainer>
    </SlideUpModal>
  );
};

export default ExchangeListModal;
