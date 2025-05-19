import { useEffect } from 'react';

import * as S from './MyCardStyle';

import { useMyCard } from '@/hooks/exchange/useExchange';
import { useGlobalStore } from '@/store/globalStore';

interface MyCardProps {
  onClick?: () => void;
}

const MyCard = ({ onClick }: MyCardProps) => {
  const { myCard, fetchMyCard } = useMyCard();
  const { isMyCardLoading, setIsMyCardLoading } = useGlobalStore();

  useEffect(() => {
    if (!isMyCardLoading) {
      fetchMyCard();
      setIsMyCardLoading(true);
    }
  }, [isMyCardLoading, fetchMyCard, setIsMyCardLoading]);

  return (
    <>
      {!myCard ? (
        <S.MyCardContainerNon onClick={onClick}>
          <S.TextContainer>
            <S.Title>나의 포카</S.Title>
            <S.NonContent>아직 포카가{`\n`}등록되지 않았어요!</S.NonContent>
          </S.TextContainer>
        </S.MyCardContainerNon>
      ) : (
        <S.MyCardContainer onClick={onClick}>
          <S.CardContainer>
            <S.Title>나의 포카</S.Title>
            <S.Content>
              <S.CardImage src={myCard?.imageUrl} />
              <S.CardInfo>
                <S.CardText>{myCard?.group}</S.CardText>
                <S.CardText>{myCard?.member}</S.CardText>
                <S.CardText>{myCard?.album}</S.CardText>
              </S.CardInfo>
            </S.Content>
          </S.CardContainer>
        </S.MyCardContainer>
      )}
    </>
  );
};

export default MyCard;
