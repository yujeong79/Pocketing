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
`;

export const MemberItemText = styled.div<{ $isSelected: boolean }>`
  ${FontStyles.headingLarge};
  color: ${(props) => (props.$isSelected ? colors.primary : colors.primary200)};
  text-align: left;

  &:hover {
    color: ${colors.primary};
  }
`;

export const MemberItemIcon = styled.img`
  width: ${scale(24)}px;
  height: ${scale(32)}px;
`;
