import { mockChat } from '@/mocks/chat';
import * as S from './TradeItemStyle';

const TradeItem = () => {
  const status = mockChat.result.linkedPost.status;
  const isAvailable = status === 'AVAILABLE';

  const formattedPrice = mockChat.result.linkedPost.price.toLocaleString();

  const handleClickTradeItem = () => {
    console.log('해당 거래글로 이동');
  };

  const handleClickStateButton = (e: React.MouseEvent) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    console.log('상태 버튼 클릭');
  };

  return (
    <S.Container onClick={handleClickTradeItem}>
      <S.ProfileSection>
        <S.ProfileImage src={mockChat.result.linkedPost.photocard.cardImageUrl} />
      </S.ProfileSection>

      <S.InfoSection>
        <S.StateButtonContainer>
          <S.StateButton isAvailable={isAvailable} onClick={handleClickStateButton}>
            {isAvailable ? '판매중' : '거래완료'}
            <S.Arrow>&gt;</S.Arrow>
          </S.StateButton>
        </S.StateButtonContainer>

        <S.AlbumTitle>{mockChat.result.linkedPost.photocard.albumTitle}</S.AlbumTitle>
      </S.InfoSection>

      {/* 가격 섹션을 오른쪽 끝으로 배치 */}
      <S.PriceSection>{formattedPrice} 원</S.PriceSection>
    </S.Container>
  );
};

export default TradeItem;
