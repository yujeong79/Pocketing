import { useState } from 'react';
import SellerListModal from '@/pages/main/components/Seller/SellerListModal';
import * as S from './PhotoCardStyle';

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
      <S.ItemContainer onClick={() => setIsSellerListOpen(true)}>
        <S.CardImage src={imageUrl} alt={albumTitle} />
        <S.AlbumTitle>{albumTitle}</S.AlbumTitle>
        <S.Divider />
        <S.PriceContainer>
          <S.AveragePriceLabel>평균 판매가</S.AveragePriceLabel>
          <S.AveragePrice>{avgPrice.toLocaleString()}원</S.AveragePrice>
        </S.PriceContainer>
      </S.ItemContainer>
      <SellerListModal
        isOpen={isSellerListOpen}
        onClose={() => setIsSellerListOpen(false)}
        cardId={cardId}
      />
    </>
  );
};

export default PhotoCardItem;
