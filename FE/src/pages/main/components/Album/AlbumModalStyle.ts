import styled from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const AlbumList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AlbumItem = styled.div<{ $isSelected?: boolean }>`
  ${FontStyles.bodyMedium};
  color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.gray800)};
  padding: ${scale(8)}px 0;
  cursor: pointer;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:last-child) {
    border-bottom: 1px solid ${colors.gray100};
  }
`;
