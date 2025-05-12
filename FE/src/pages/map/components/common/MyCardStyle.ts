import styled from 'styled-components';

import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const MyCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
  width: ${scale(125)}px;
`;

// 카드가 없을 때
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

// 카드가 있을 떄
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

export const CardImage = styled.img`
  width: ${scale(40)}px;
  height: ${scale(64)}px;
  border-radius: ${scale(5)}px;
  box-shadow: 0px ${scale(3)}px ${scale(6)}px 0px rgba(0, 0, 0, 0.2);
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
