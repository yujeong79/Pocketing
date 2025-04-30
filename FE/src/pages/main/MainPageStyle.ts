import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const SelectedMemberText = styled.div`
  ${FontStyles.headingSmall};
  margin-top: ${scale(12)}px;
  padding-left: ${scale(16)}px;
  width: 100%;
  text-align: left;

  span {
    color: ${colors.primary};
  }
`;
