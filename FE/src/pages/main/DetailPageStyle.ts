import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled from 'styled-components';

export const DetailPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - ${scale(128)}px);
`;

export const ContentSection = styled.div`
  flex: 1;
  overflow-y: hidden;
`;

export const GraySection = styled.div`
  width: 100%;
  min-height: ${scale(364)}px;
  background-color: ${colors.gray100};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 ${scale(16)}px;
`;

export const InformationText = styled.p`
  ${FontStyles.captionSmall};
  color: ${colors.gray600};
  white-space: pre-line;
  text-align: center;
  margin-top: ${scale(12)}px;
  margin-bottom: ${scale(12)}px;
`;

export const PhotoCardImage = styled.img`
  width: ${scale(168)}px;
  height: ${scale(258)}px;
  object-fit: cover;
  border-radius: ${scale(4)}px;
`;

export const ChipsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${scale(8)}px;
  flex-wrap: wrap;
`;

export const SellerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const ChatButton = styled.div`
  margin-top: ${scale(8)}px;
  margin-bottom: ${scale(24)}px;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: ${scale(24)}px;
`;

export const PriceEditIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  vertical-align: middle;
  margin-right: ${scale(2)}px;
  transform: translateY(-${scale(2)}px);
`;
