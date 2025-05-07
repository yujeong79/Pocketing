import { mockExchange } from '@/mocks/exchange';
import * as S from './ExchangeItemStyle';
import { ExchangeIcon } from '@/assets/assets';

const ExchangeItem = () => {
  const { myCard, otherCard } = mockExchange.result;

  return (
    <S.Container>
      <S.CardSection>
        <S.CardImage src={otherCard.imageUrl} alt={otherCard.member} />
        <S.TextSection>
          <S.Member>{otherCard.member}</S.Member>
          <S.Album>{otherCard.album}</S.Album>
        </S.TextSection>
      </S.CardSection>

      <S.ExchangeIcon>
        <img src={ExchangeIcon} alt="exchange" />
      </S.ExchangeIcon>

      <S.CardSection isMyCard>
        <S.CardImage src={myCard.imageUrl} alt={myCard.member} />
        <S.TextSection isMyCard>
          <S.Member>{myCard.member}</S.Member>
          <S.Album>{myCard.album}</S.Album>
        </S.TextSection>
      </S.CardSection>
    </S.Container>
  );
};

export default ExchangeItem;
