import styled from 'styled-components';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const ItemContainer = styled.div`
  cursor: pointer;
  width: 100%;
`;

export const ItemContent = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: ${scale(12)}px;
`;

export const PhotoCard = styled.img`
  width: ${scale(48)}px;
  height: ${scale(73)}px;
  object-fit: cover;
  border-radius: ${scale(4)}px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${scale(24)}px;
  width: 240px;
`;

export const NicknameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(2)}px;
`;

export const Nickname = styled.span`
  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;

export const VerifyIconWrapper = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const PriceWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(2)}px;
`;

export const Price = styled.span`
  ${FontStyles.bodyMedium};
  color: ${colors.gray800};
  margin-right: ${scale(4)}px;
`;

export const BracketIconWrapper = styled.img`
  width: ${scale(8)}px;
  height: ${scale(10)}px;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.gray100};
  margin-bottom: ${scale(12)}px;
`;
