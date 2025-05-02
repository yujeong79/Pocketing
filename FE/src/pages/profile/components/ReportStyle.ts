import styled from 'styled-components';

import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  gap: ${scale(4)}px;
`;

export const TitleIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
`;

export const Title = styled.div`
  ${FontStyles.headingSmall};
  color: ${colors.primary};
`;
