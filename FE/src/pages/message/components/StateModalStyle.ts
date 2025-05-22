import styled from 'styled-components';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';
import scale from '@/utils/scale';

export const StateList = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const StateItem = styled.div<{ $isSelected: boolean }>`
  padding: ${scale(16)}px;
  border-radius: ${scale(8)}px;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary100 : colors.white)};
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.black)};
  ${FontStyles.bodyMedium};
  cursor: pointer;

  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? colors.primary100 : colors.gray100)};
  }
`;
