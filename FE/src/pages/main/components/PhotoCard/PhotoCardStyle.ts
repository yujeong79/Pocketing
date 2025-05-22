import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const ItemContainer = styled.div`
  width: ${scale(110)}px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const CardImage = styled.img`
  width: ${scale(110)}px;
  height: ${scale(170)}px;
  border-radius: ${scale(4)}px;
  object-fit: cover;
`;

export const AlbumTitle = styled.div`
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

export const Divider = styled.div`
  width: 100%;
  height: ${scale(0.3)}px;
  background-color: ${colors.gray600};
  margin: ${scale(2)}px 0 ${scale(4)}px;
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const AveragePriceLabel = styled.span`
  ${FontStyles.captionSmall};
  color: ${colors.gray600};
`;

export const AveragePrice = styled.span`
  ${FontStyles.captionMedium};
  color: ${colors.gray800};
  margin-top: ${scale(2)}px;
`;

// PhotoCardList
export const ListContainer = styled.div`
  width: 100%;
  padding: ${scale(8)}px;
  overflow-y: auto;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, ${scale(110)}px);
  gap: ${scale(12)}px ${scale(32)}px;
  justify-content: center;
`;

export const EmptyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-top: ${scale(40)}px;
  gap: ${scale(12)}px;
`;

export const EmptyCartImage = styled.img`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

export const EmptyText = styled.span`
  ${FontStyles.bodySmall};
  color: ${colors.gray600};
`;
