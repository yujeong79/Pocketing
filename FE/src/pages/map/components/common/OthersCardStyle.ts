import styled from 'styled-components';

import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const OthersCardContainerNon = styled.div`
  display: flex;
  flex-direction: column;
  width: ${scale(125)}px;
  background-color: ${colors.white};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
  height: ${scale(65)}px;
`;

export const OthersCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${scale(125)}px;
  background-color: ${colors.white};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

// 등록 전
export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${scale(12)}px ${scale(25)}px;
`;

export const Title = styled.div`
  ${FontStyles.captionMedium}
  color: ${colors.primary};
`;

export const NonContent = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray400};
  white-space: pre-line;
`;

// 등록 후
export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  margin: ${scale(8)}px ${scale(12)}px;
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  gap: ${scale(8)}px;
  width: 100%;
`;

export const CardImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-width: ${scale(40)}px;
  min-height: ${scale(64)}px;
  border-radius: ${scale(5)}px;
  border: ${scale(1)}px solid ${colors.primary};
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.2);
`;

export const HeartIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${scale(4)}px;
  width: 100%;
`;

export const CardText = styled.div`
  text-align: left;
  ${FontStyles.captionSmall}
  color: ${colors.gray500};
  width: 100%;
`;
