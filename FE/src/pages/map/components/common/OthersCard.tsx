import { useCallback, useEffect, useState } from 'react';

import * as S from './OthersCardStyle';

import { FullHeartIcon } from '@/assets/assets';
import { getOthersCard } from '@/api/exchange/exchangeCard';
import { GetRegisteredCardResponse } from '@/types/exchange';

interface OthersCardProps {
  onClick: () => void;
}

const OthersCard = ({ onClick }: OthersCardProps) => {
  const [othersCard, setOthersCard] = useState<GetRegisteredCardResponse | null>(null);

  const handleGetOthersCard = useCallback(async () => {
    try {
      const response = await getOthersCard();
      setOthersCard(response.result);
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    handleGetOthersCard();
  }, [handleGetOthersCard]);

  return (
    <>
      {!othersCard ? (
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
                <S.CardText>{othersCard?.group}</S.CardText>
                <S.CardText>{othersCard?.member}</S.CardText>
                <S.CardText>{othersCard?.album}</S.CardText>
              </S.CardInfo>
            </S.Content>
          </S.CardContainer>
        </S.OthersCardContainer>
      )}
    </>
  );
};

export default OthersCard;
