import { mockChat } from '@/mocks/chat';
import * as S from './TradeItemStyle';

const TradeItem = () => {
  const status = mockChat.result.linkedPost.status;
  const isAvailable = status === 'AVAILABLE';

  const formattedPrice = mockChat.result.linkedPost.price.toLocaleString();

  return (
    <S.Container>
      <S.ProfileSection>
        <S.ProfileImage src={mockChat.result.linkedPost.photocard.cardImageUrl} />
      </S.ProfileSection>
      <S.InfoSection>
        <S.StateButton isAvailable={isAvailable}>
          {isAvailable ? '판매중' : '거래완료'}
          <S.Arrow>&gt;</S.Arrow>
        </S.StateButton>
        <S.AlbumTitle>{mockChat.result.linkedPost.photocard.albumTitle}</S.AlbumTitle>
      </S.InfoSection>
      <S.PriceSection>{formattedPrice} 원</S.PriceSection>
    </S.Container>
  );
};

export default TradeItem;
