import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';
import { FontStyles } from '@/constants/fonts';

export const MemberItem = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  gap: ${scale(8)}px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
`;

export const MemberItemText = styled.div<{ $isSelected: boolean }>`
  ${FontStyles.headingLarge};
  color: ${(props) => (props.$isSelected ? colors.primary : colors.primary200)};
  text-align: left;
  transition: color 0.2s ease-in-out;

  ${MemberItem}:hover & {
    color: ${colors.primary};
  }
`;

export const MemberItemIcon = styled.img`
  width: ${scale(22)}px;
  height: ${scale(28)}px;
  transition: opacity 0.2s ease-in-out;
  opacity: 1;
`;
