import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';
import { useState } from 'react';
import SellerListModal from '@/pages/main/components/SellerList/SellerListModal';

interface PhotoCardItemProps {
  cardId: number;
  imageUrl: string;
  albumTitle: string;
  avgPrice: number;
}

const PhotoCardItem = ({ cardId, imageUrl, albumTitle, avgPrice }: PhotoCardItemProps) => {
  const [isSellerListOpen, setIsSellerListOpen] = useState(false);

  return (
    <>
      <Container onClick={() => setIsSellerListOpen(true)}>
        <CardImage src={imageUrl} alt={albumTitle} />
        <AlbumTitle>{albumTitle}</AlbumTitle>
        <Divider />
        <PriceContainer>
          <AveragePriceLabel>평균 판매가</AveragePriceLabel>
          <AveragePrice>{avgPrice.toLocaleString()}원</AveragePrice>
        </PriceContainer>
      </Container>
      <SellerListModal
        isOpen={isSellerListOpen}
        onClose={() => setIsSellerListOpen(false)}
        cardId={cardId}
      />
    </>
  );
};

const Container = styled.div`
  width: ${scale(110)}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const CardImage = styled.img`
  width: ${scale(110)}px;
  height: ${scale(170)}px;
  border-radius: ${scale(4)}px;
  object-fit: cover;
`;

const AlbumTitle = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray600};
  margin-top: ${scale(8)}px;
  height: ${scale(28)}px;
  width: 100%;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  line-height: ${scale(14)}px;
`;

const Divider = styled.div`
  width: 100%;
  height: ${scale(0.3)}px;
  background-color: ${colors.gray600};
  margin: ${scale(2)}px 0 ${scale(4)}px;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const AveragePriceLabel = styled.span`
  ${FontStyles.captionSmall};
  color: ${colors.gray600};
`;

const AveragePrice = styled.span`
  ${FontStyles.captionMedium};
  color: ${colors.gray800};
  margin-top: ${scale(2)}px;
`;

export default PhotoCardItem;
