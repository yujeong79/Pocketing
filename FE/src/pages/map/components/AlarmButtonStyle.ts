import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

interface AlarmButtonContainerProps {
  $isAlarm: boolean;
}

export const AlarmButtonContainer = styled.div<AlarmButtonContainerProps>`
  width: ${scale(32)}px;
  height: ${scale(32)}px;
  border-radius: ${scale(5)}px;
  background-color: ${({ $isAlarm }) => ($isAlarm ? colors.primary : colors.white)};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AlarmImage = styled.img`
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;
