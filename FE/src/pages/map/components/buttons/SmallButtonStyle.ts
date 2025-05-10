import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const SmallButtonContainer = styled.div<{ type: 'accept' | 'reject' }>`
  cursor: pointer;
  width: ${scale(96)}px;
  height: ${scale(24)}px;
  border-radius: ${scale(5)}px;
  background-color: ${({ type }) => (type === 'accept' ? colors.primary : colors.white)};
  border: ${({ type }) =>
    type === 'accept'
      ? `${scale(1)}px solid ${colors.primary}`
      : `${scale(1)}px solid ${colors.danger}`};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SmallButtonText = styled.div<{ type: 'accept' | 'reject' }>`
  ${FontStyles.captionMedium};
  color: ${({ type }) => (type === 'accept' ? colors.white : colors.danger)};
`;
