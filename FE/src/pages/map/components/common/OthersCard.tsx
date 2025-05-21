import { useEffect } from 'react';

import * as S from './OthersCardStyle';

import { FullHeartIcon } from '@/assets/assets';
import { useGlobalStore } from '@/store/globalStore';
import { useOthersCard } from '@/hooks/exchange/useExchange';

interface OthersCardProps {
  onClick: () => void;
}

const OthersCard = ({ onClick }: OthersCardProps) => {
  const { myWishCard, fetchOthersCard } = useOthersCard();
  const { isMyWishCardLoading, setIsMyWishCardLoading } = useGlobalStore();

  useEffect(() => {
    if (!isMyWishCardLoading) {
      fetchOthersCard();
      setIsMyWishCardLoading(true);
    }
  }, [isMyWishCardLoading, fetchOthersCard, setIsMyWishCardLoading]);

  return (
    <>
      {!myWishCard ? (
        <S.OthersCardContainerNon onClick={onClick}>
          <S.TextContainer>
            <S.Title>원하는 포카</S.Title>
            <S.NonContent>아직 포카가{`\n`}등록되지 않았어요!</S.NonContent>
          </S.TextContainer>
        </S.OthersCardContainerNon>
      ) : (
        <S.OthersCardContainer onClick={onClick}>
          <S.CardContainer>
            <S.Title>원하는 포카</S.Title>
            <S.Content>
              <S.CardImage>
                <S.HeartIcon src={FullHeartIcon} />
              </S.CardImage>
              <S.CardInfo>
                <S.CardText>{myWishCard?.group}</S.CardText>
                <S.CardText>{myWishCard?.member}</S.CardText>
                <S.CardText>{myWishCard?.album}</S.CardText>
              </S.CardInfo>
            </S.Content>
          </S.CardContainer>
        </S.OthersCardContainer>
      )}
    </>
  );
};

export default OthersCard;
