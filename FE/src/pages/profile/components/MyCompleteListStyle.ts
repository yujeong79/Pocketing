import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const RightArrowButton = styled.img`
  width: ${scale(6)}px;
  height: ${scale(12)}px;
`;

export const MyCompleteListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: ${scale(12)}px;
`;

export const MyCompleteTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const MyCompleteTitleLeftContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(4)}px;
`;

export const MyCompleteTitleIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const MyCompleteTitle = styled.div`
  ${FontStyles.headingSmall};
  color: ${colors.primary};
`;

export const MyCompleteDetailButton = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.primary};
  font-weight: bold;
`;

export const NonItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${scale(48)}px;
`;

export const NonItemText = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.gray500};
`;

export const MyCompleteItemContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
`;

export const MyCompleteItemDate = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray500};
  padding-bottom: ${scale(8)}px;
  text-align: left;
`;

export const MyCompleteItemInfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InfoAndButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(16)}px;
`;

export const CardImage = styled.img`
  width: ${scale(48)}px;
  height: ${scale(73)}px;
  border-radius: ${scale(4)}px;
`;

export const CardInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const CardFirstLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(24)}px;
`;

export const GroupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const Group = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray800};
`;

export const MemberContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const Member = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray800};
`;

export const CardSecondLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const AlbumContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const Album = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray800};
`;

export const CardThirdLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const VersionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const Version = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray800};
`;

export const TagContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${scale(1)}px ${scale(4)}px;
  background-color: ${colors.primary100};
  border-radius: ${scale(7)}px;
`;

export const Tag = styled.div`
  ${FontStyles.captionSmall};
  font-weight: bold;
  color: ${colors.gray800};
`;

export const MyCompleteItemPriceContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  gap: ${scale(4)}px;
`;

export const MyCompletePriceTitle = styled.div`
  ${FontStyles.captionSmall};
  color: ${colors.gray800};
  text-align: right;
`;

export const MyCompleteItemPriceText = styled.div`
  display: flex;
  gap: ${scale(4)}px;
  justify-content: flex-end;
`;

export const MyCompleteItemPrice = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;

export const MyCompleteItemPriceWon = styled.div`
  ${FontStyles.bodySmall};
  color: ${colors.gray800};
`;
