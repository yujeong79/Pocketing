import * as S from './MyCardStyle';
import { useCallback, useEffect, useState } from 'react';

import { GetRegisteredCardResponse } from '@/types/exchange';
import { getMyCard } from '@/api/exchange/exchangeCard';

interface MyCardProps {
  onClick?: () => void;
}

const MyCard = ({ onClick }: MyCardProps) => {
  const [myCard, setMyCard] = useState<GetRegisteredCardResponse | null>(null);

  const handleGetMyCard = useCallback(async () => {
    try {
      const response = await getMyCard();
      setMyCard(response.result);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    handleGetMyCard();
  }, [handleGetMyCard]);

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
