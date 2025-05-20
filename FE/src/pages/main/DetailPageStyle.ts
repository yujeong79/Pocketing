import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - ${scale(120)}px);
  padding-top: ${scale(44)}px;
`;

export const ContentSection = styled.div`
  flex: 1;
  overflow-y: hidden;
`;

export const GraySection = styled.div`
  width: 100%;
  min-height: ${scale(350)}px;
  background-color: ${colors.gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${scale(16)}px;
`;

export const InformationText = styled.p`
  ${FontStyles.captionSmall};
  color: ${colors.gray600};
  white-space: pre-line;
  text-align: center;
  margin-bottom: ${scale(12)}px;
`;

export const PhotoCardImage = styled.img`
  width: ${scale(137)}px;
  height: ${scale(210)}px;
  object-fit: cover;
  border-radius: ${scale(4)}px;
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

export const InfoChipContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${scale(8)}px;
  margin-top: -${scale(8)}px;
`;

export const SellerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChatButton = styled.div`
  margin-top: ${scale(8)}px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const PriceEditIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  vertical-align: middle;
  margin-right: ${scale(2)}px;
  transform: translateY(-${scale(2)}px);
`;

export const FixedBottomButton = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: ${scale(70)}px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;
  background: transparent;
  pointer-events: auto;
`;
