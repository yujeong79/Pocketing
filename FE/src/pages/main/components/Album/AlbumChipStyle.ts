import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

export const StyledAlbumChip = styled.button<{ $isSelected: boolean }>`
  height: ${scale(18)}px;
  padding: 0 ${scale(8)}px;
  border-radius: ${scale(4)}px;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.primary100)};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${scale(2)}px;
  font-family: 'Pretendard';
  white-space: nowrap;
  transition: all 0.2s ease;
  margin-left: auto;
`;

export const ChipText = styled.span<{ $isSelected: boolean }>`
  font-size: ${scale(12)}px;
  font-weight: 500;
  color: ${({ $isSelected }) => ($isSelected ? 'white' : colors.gray800)};
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: ${scale(1)}px;

  img {
    width: ${scale(13)}px;
    height: ${scale(13)}px;
  }
`;
