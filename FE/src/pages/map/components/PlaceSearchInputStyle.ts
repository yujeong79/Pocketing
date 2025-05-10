import styled from 'styled-components';

import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const MapSearchContainer = styled.div`
  width: ${scale(226)}px;
  height: ${scale(32)}px;
  background-color: ${colors.white};
  border-radius: ${scale(5)}px;
  box-shadow: 0px ${scale(4)}px ${scale(4)}px 0px rgba(0, 0, 0, 0.1);
`;

export const MapSearchInput = styled.input`
  width: 100%;
  height: 100%;
  padding: ${scale(8)}px ${scale(12)}px;

  border: none;
  outline: none;
  border-radius: ${scale(5)}px;

  ${FontStyles.captionMedium};
  color: ${colors.gray800};
`;
