import styled from 'styled-components';

import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

export const OthersCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors.white};
  border-radius: ${scale(10)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: ${scale(12)}px ${scale(25)}px;
`;

export const Title = styled.div`
  ${FontStyles.captionMedium}
  color: ${colors.primary};
`;

export const Content = styled.div`
  ${FontStyles.captionSmall}
  color: ${colors.gray400};
  white-space: pre-line;
`;
