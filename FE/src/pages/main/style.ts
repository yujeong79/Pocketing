import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';

export const MainPageContainer = styled.div`
  ${FontStyles.displayXlarge}
  color: ${colors.primary};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
