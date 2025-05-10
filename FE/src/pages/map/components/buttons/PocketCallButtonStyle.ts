import styled from 'styled-components';

import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const PocketCallButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const PocketCallContent = styled.div<{ $type: 'basic' | 'send' }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${scale(4)}px;
  width: ${scale(81)}px;
  background-color: ${({ $type }) => ($type === 'basic' ? colors.primary : colors.gray600)};
  padding: ${scale(4)}px ${scale(8)}px;
  border-radius: ${scale(5)}px;
`;

export const PocketCallText = styled.div`
  ${FontStyles.bodyMedium}
  color: ${colors.white};
`;

export const PocketCallIcon = styled.img`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;
