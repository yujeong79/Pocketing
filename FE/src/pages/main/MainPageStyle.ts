import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const MainContainer = styled.div`
  width: 100%;
  padding-top: ${scale(50)}px;
  padding-bottom: ${scale(72)}px;
`;

export const SelectedMemberText = styled.div`
  ${FontStyles.headingSmall};
  text-align: left;
  display: flex;
  align-items: center;

  span {
    color: ${colors.primary};
  }
`;

export const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  padding: ${scale(12)}px ${scale(16)}px 0;
`;
