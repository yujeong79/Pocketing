import * as S from './OthersCardStyle';

import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKeys';
import { OthersCardData } from '@/types/exchange';
import { FullHeartIcon } from '@/assets/assets';

interface OthersCardProps {
  onClick: () => void;
}

const OthersCard = ({ onClick }: OthersCardProps) => {
  const queryClient = useQueryClient();
  const cardData = queryClient.getQueryData<OthersCardData>([QUERY_KEYS.OTHERSCARD]);
  const hasCardData = cardData?.cardGroup && cardData?.cardMember && cardData?.cardAlbum;

  return (
    <>
      {!hasCardData ? (
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
                <S.CardText>{cardData.cardGroup}</S.CardText>
                <S.CardText>{cardData.cardMember}</S.CardText>
                <S.CardText>{cardData.cardAlbum}</S.CardText>
              </S.CardInfo>
            </S.Content>
          </S.CardContainer>
        </S.OthersCardContainer>
      )}
    </>
  );
};

export default OthersCard;
