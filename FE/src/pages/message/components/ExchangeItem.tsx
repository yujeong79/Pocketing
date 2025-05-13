import * as S from './ExchangeItemStyle';
import { LinkedExchange } from '@/types/chat';
import { useAuth } from '@/hooks/useAuth';

interface ExchangeItemProps {
  linkedExchange: LinkedExchange;
}

const ExchangeItem = ({ linkedExchange }: ExchangeItemProps) => {
  const { user } = useAuth();
  const isRequester = user?.userId === linkedExchange.requester.userId;

  const myCard = isRequester ? linkedExchange.requester : linkedExchange.responder;
  const otherCard = isRequester ? linkedExchange.responder : linkedExchange.requester;

  return (
    <S.Container>
      <S.CardSection>
        <S.CardImage src={myCard.exchangeImageUrl} alt="내 카드" />
        <S.TextSection>
          <S.Member>{myCard.memberName}</S.Member>
          <S.Album>{myCard.albumName}</S.Album>
        </S.TextSection>
      </S.CardSection>

      <S.ExchangeIcon>
        <img src="/icons/exchange.svg" alt="교환" />
      </S.ExchangeIcon>

      <S.CardSection isMyCard>
        <S.CardImage src={otherCard.exchangeImageUrl} alt="상대방 카드" />
        <S.TextSection isMyCard>
          <S.Member>{otherCard.memberName}</S.Member>
          <S.Album>{otherCard.albumName}</S.Album>
        </S.TextSection>
      </S.CardSection>
    </S.Container>
  );
};

export default ExchangeItem;
