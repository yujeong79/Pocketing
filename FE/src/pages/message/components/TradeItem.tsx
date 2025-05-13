import * as S from './TradeItemStyle';
import { useState } from 'react';
import StateModal from './StateModal';
import { LinkedPost } from '@/types/chat';

type Status = 'AVAILABLE' | 'COMPLETED';

interface TradeItemProps {
  linkedPost: LinkedPost;
}

const TradeItem = ({ linkedPost }: TradeItemProps) => {
  const [status, setStatus] = useState<Status>(linkedPost.status as Status);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const isAvailable = status === 'AVAILABLE';

  const formattedPrice = linkedPost.price.toLocaleString();

  const handleClickTradeItem = () => {
    console.log('해당 거래글로 이동');
  };

  const handleClickStateButton = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsStateModalOpen(true);
  };

  const handleStateSelect = (newStatus: Status) => {
    setStatus(newStatus);
  };

  return (
    <>
      <S.Container onClick={handleClickTradeItem}>
        <S.ProfileSection>
          <S.ProfileImage src={linkedPost.photocard.cardImageUrl} />
        </S.ProfileSection>

        <S.InfoSection>
          <S.StateButtonContainer>
            <S.StateButton data-available={isAvailable} onClick={handleClickStateButton}>
              {isAvailable ? '판매중' : '거래완료'}
              <S.Arrow>&gt;</S.Arrow>
            </S.StateButton>
          </S.StateButtonContainer>

          <S.AlbumTitle>{linkedPost.photocard.albumTitle}</S.AlbumTitle>
        </S.InfoSection>

        <S.PriceSection>{formattedPrice} 원</S.PriceSection>
      </S.Container>

      <StateModal
        isOpen={isStateModalOpen}
        onClose={() => setIsStateModalOpen(false)}
        onSelect={handleStateSelect}
        currentStatus={status}
      />
    </>
  );
};

export default TradeItem;
