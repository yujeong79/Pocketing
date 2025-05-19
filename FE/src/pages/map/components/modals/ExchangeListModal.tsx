import React, { useCallback, useEffect, useState } from 'react';

import * as S from './ExchangeListModalStyle';
import SlideUpModal from '@/components/common/SlideUpModal';
import PocketCallButton from '../buttons/PocketCallButton';
import Toast from '../common/Toast';
import { RefreshIcon2 } from '@/assets/assets';
import { Exchange } from '@/types/exchange';
import { postPocketCall } from '@/api/exchange/pocketCall';
import { PocketCallRequest } from '@/types/exchange';
import { useGlobalStore } from '@/store/globalStore';
import { useMyCard } from '@/hooks/exchange/useExchange';

interface ExchangeListModalProps {
  isOpen: boolean;
  onClose: () => void;
  filteredList: Exchange[];
  onRefresh: () => void;
}

const ExchangeListModal = ({
  isOpen,
  onClose,
  filteredList,
  onRefresh,
}: ExchangeListModalProps) => {
  const [spinning, setSpinning] = useState(false);
  const [pocketCallCount, setPocketCallCount] = useState(0);
  const [showMaxToast, setShowMaxToast] = useState(false);
  const [showSendToast, setShowSendToast] = useState(false);
  const { isMyCardLoading, setIsMyCardLoading } = useGlobalStore();
  const { myCard, fetchMyCard } = useMyCard();

  useEffect(() => {
    if (!isMyCardLoading) {
      fetchMyCard();
      setIsMyCardLoading(true);
    }
  }, [isMyCardLoading, fetchMyCard, setIsMyCardLoading]);

  const handleRefreshClick = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 300);
    onRefresh();
  };

  const handlePostPocketCall = useCallback(
    async (userId: number, cardId: number) => {
      if (!myCard.exchangeCardId) {
        return;
      }

      try {
        const pocketCallData: PocketCallRequest = {
          responderId: userId,
          requesterOwnedCardId: myCard.exchangeCardId,
          responderOwnedCardId: cardId,
        };
        await postPocketCall(pocketCallData);
        onRefresh();

        if (pocketCallCount < 5) {
          setPocketCallCount((prev) => prev + 1);
          setShowSendToast(true);
          setTimeout(() => {
            setPocketCallCount((prev) => prev - 1);
          }, 180000);
        } else {
          setShowMaxToast(true);
        }
      } catch (error) {
        throw error;
      }
    },
    [myCard.exchangeCardId, pocketCallCount, onRefresh]
  );

  return (
    <SlideUpModal header="거래중인 포케터" isOpen={isOpen} onClose={onClose}>
      <S.ExchangeModalSecondHeader>
        <S.ExchangeModalSecondHeaderText>
          근처에서 교환을 신청할 포케터를 {`\n`}선택해주세요
        </S.ExchangeModalSecondHeaderText>
        <S.ExchangeListRefreshButton
          src={RefreshIcon2}
          onClick={handleRefreshClick}
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
      {filteredList.length === 0 ? (
        <S.ExchangeListEmptyContainer>해당하는 포케터들이 아직 없어요</S.ExchangeListEmptyContainer>
      ) : (
        <S.ExchangeUserListContainer>
          {filteredList.map((user, index) => (
            <React.Fragment key={user.userId}>
              <S.ExchangeUserList>
                <S.ExchangeUserLeft>
                  <S.ExchangeCardImage src={user.card.imageUrl} />
                  <S.ExchangeUserName>{user.nickname}</S.ExchangeUserName>
                </S.ExchangeUserLeft>
                <PocketCallButton
                  onClick={() => handlePostPocketCall(user.userId, user.card.cardId)}
                  disabled={pocketCallCount >= 5}
                  $isRequested={user.requestStatus}
                />
              </S.ExchangeUserList>
              {index !== filteredList.length - 1 && <S.Divider />}
            </React.Fragment>
          ))}
        </S.ExchangeUserListContainer>
      )}
      {showMaxToast && (
        <Toast
          type="warning"
          message="포켓콜은 3분마다 최대 5개까지 보낼 수 있어요!"
          onClose={() => setShowMaxToast(false)}
        />
      )}
      {showSendToast && (
        <Toast
          type="success"
          message="포켓콜을 보냈어요! 포케터의 수락을 기다리세요!"
          onClose={() => setShowSendToast(false)}
        />
      )}
    </SlideUpModal>
  );
};

export default ExchangeListModal;
