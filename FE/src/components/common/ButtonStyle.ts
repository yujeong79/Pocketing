import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';

export const ButtonContainer = styled.button`
  cursor: pointer;
  width: ${scale(266)}px;
  height: ${scale(48)}px;
  background-color: ${theme.colors.primary};
  border-radius: ${scale(10)}px;
  border: none;

  ${FontStyles.headingMedium};
  color: ${theme.colors.white};
  text-align: center;
`;
