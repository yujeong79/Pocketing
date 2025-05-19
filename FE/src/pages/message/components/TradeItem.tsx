import * as S from './TradeItemStyle';
import { useState } from 'react';
import StateModal from './StateModal';
import { LinkedPost } from '@/types/chat';
import { useUpdatePostStatus } from '@/hooks/post/mutation/useStatus';
import { useNavigate } from 'react-router-dom';
import { useSales } from '@/hooks/sales/useSales';

type Status = 'AVAILABLE' | 'COMPLETED';

interface TradeItemProps {
  linkedPost: LinkedPost;
  roomId: number;
  isMyPost: boolean;
}

const TradeItem = ({ linkedPost, roomId, isMyPost }: TradeItemProps) => {
  const [status, setStatus] = useState<Status>(linkedPost.status as Status);
  const [isStateModalOpen, setIsStateModalOpen] = useState(false);
  const { mutate: updatePostStatus } = useUpdatePostStatus();
  const navigate = useNavigate();
  const isAvailable = status === 'AVAILABLE';
  const { fetchSales } = useSales();

  const formattedPrice = linkedPost.price.toLocaleString();

  const handleClickTradeItem = () => {
    navigate(`/detail/${linkedPost.postId}`);
  };

  const handleClickStateButton = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    setIsStateModalOpen(true);
  };

  const handleStateSelect = async (newStatus: Status) => {
    setStatus(newStatus);
    await updatePostStatus({ roomId, status: newStatus });
    await fetchSales();
  };

  return (
    <>
      <S.Container onClick={handleClickTradeItem}>
        <S.ProfileSection>
          <S.ProfileImage src={linkedPost.photocard.cardImageUrl} />
        </S.ProfileSection>

        <S.InfoSection>
          <S.StateButtonContainer>
            {isMyPost ? (
              <S.StateButton data-available={isAvailable} onClick={handleClickStateButton}>
                {isAvailable ? '판매중' : '거래완료'}
                <S.Arrow>&gt;</S.Arrow>
              </S.StateButton>
            ) : (
              <S.StateButton data-available={isAvailable} as="div">
                {isAvailable ? '판매중' : '거래완료'}
              </S.StateButton>
            )}
          </S.StateButtonContainer>

          <S.AlbumRow>
            <S.AlbumTitle>{linkedPost.photocard.albumTitle}</S.AlbumTitle>
            <S.PriceSection>{formattedPrice} 원</S.PriceSection>
          </S.AlbumRow>
        </S.InfoSection>
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
