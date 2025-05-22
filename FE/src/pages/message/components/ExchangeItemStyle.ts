import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${scale(8)}px;
  background-color: ${colors.white};
  position: relative;
  width: 100%;
`;

export const CardSection = styled.div<{ isMyCard?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${scale(12)}px;
  flex-direction: ${({ isMyCard }) => (isMyCard ? 'row-reverse' : 'row')};
  width: 40%;
`;

export const CardImage = styled.img`
  width: ${scale(40)}px;
  height: ${scale(64)}px;
  border-radius: ${scale(5)}px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  flex-shrink: 0;
`;

export const TextSection = styled.div<{ isMyCard?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  text-align: ${({ isMyCard }) => (isMyCard ? 'right' : 'left')};
  flex: 1;
  min-width: 0;
`;

export const Member = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray500};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Album = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray800};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-height: 1.2;
`;

export const ExchangeIcon = styled.div`
  position: absolute;
  left: 50%;
  bottom: ${scale(8)}px;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: ${scale(24)}px;
    height: ${scale(24)}px;
  }
`;
