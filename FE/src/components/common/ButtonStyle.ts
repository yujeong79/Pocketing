import styled from 'styled-components';
import { theme } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const ButtonContainer = styled.button`
  cursor: pointer;
  width: 266px;
  height: 48px;
  background-color: ${theme.colors.primary};
  border-radius: 10px;
  border: none;

  ${FontStyles.headingMedium};
  color: ${theme.colors.white};
  text-align: center;
`;
