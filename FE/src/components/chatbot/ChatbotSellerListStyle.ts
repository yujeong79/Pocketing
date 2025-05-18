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
  margin-left: ${scale(34)}px;
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
  width: ${scale(10)}px;
  height: ${scale(10)}px;
`;

export const Divider = styled.div`
  width: 100%;
  height: ${scale(1)}px;
  background-color: ${colors.gray100};
  margin-bottom: ${scale(12)}px;
`;

export const ModalSellerCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: ${scale(8)}px;
  margin-top: ${scale(8)}px;
  width: auto;
`;

export const ModalSellerImage = styled.img`
  width: ${scale(80)}px;
  border-radius: ${scale(4)}px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ModalSellerInfo = styled.div`
  width: ${scale(120)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: ${scale(24)}px;
  margin-left: ${scale(6)}px;
`;

export const ModalSellerNickname = styled.div`
  font-weight: bold;
  font-size: ${scale(14)}px;
`;

export const ModalSellerPrice = styled.div`
  color: ${colors.primary};

  font-size: ${scale(13)}px;
  margin-top: ${scale(2)}px;
`;
