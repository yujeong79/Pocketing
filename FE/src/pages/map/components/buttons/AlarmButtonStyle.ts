import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

export const AlarmButtonContainer = styled.div<{ $hasUnread: boolean }>`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(5)}px;
  background-color: ${({ $hasUnread }) => ($hasUnread ? colors.primary : colors.white)};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlarmImage = styled.img`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;
