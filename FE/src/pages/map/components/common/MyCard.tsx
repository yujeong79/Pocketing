import * as S from './MyCardStyle';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { MyCardData } from '@/types/card';

interface MyCardProps {
  onClick?: () => void;
}

const MyCard = ({ onClick }: MyCardProps) => {
  const queryClient = useQueryClient();
  const cardData = queryClient.getQueryData<MyCardData>([QUERY_KEYS.MYCARD]);
  const hasCardData =
    cardData?.cardImage && cardData?.cardGroup && cardData?.cardMember && cardData?.cardAlbum;

  return (
    <S.MyCardContainer onClick={onClick}>
      {!hasCardData ? (
        <S.TextContainer>
          <S.Title>나의 포카</S.Title>
          <S.NonContent>아직 포카가{`\n`}등록되지 않았어요!</S.NonContent>
        </S.TextContainer>
      ) : (
        <S.CardContainer>
          <S.Title>나의 포카</S.Title>
          <S.Content>
            <S.CardImage src={cardData.cardImage} />
            <S.CardInfo>
              <S.CardText>{cardData.cardGroup}</S.CardText>
              <S.CardText>{cardData.cardMember}</S.CardText>
              <S.CardText>{cardData.cardAlbum}</S.CardText>
            </S.CardInfo>
          </S.Content>
        </S.CardContainer>
      )}
    </S.MyCardContainer>
  );
};

export default MyCard;
