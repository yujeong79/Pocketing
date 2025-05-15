import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

interface StyledMemberChipProps {
  $isSelected?: boolean;
}

export const StyledMemberChip = styled.button<StyledMemberChipProps>`
  height: ${scale(18)}px;
  padding: 0 ${scale(8)}px;
  border-radius: ${scale(4)}px;
  background-color: ${({ $isSelected }) => ($isSelected ? colors.primary : colors.primary100)};
  color: ${({ $isSelected }) => ($isSelected ? 'white' : colors.gray800)};
  border: none;
  cursor: pointer;
  font-family: 'Pretendard';
  font-weight: 500;
  font-size: ${scale(12)}px;
  white-space: nowrap;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
`;

export const StyledMemberChipList = styled.div`
  display: flex;
  gap: ${scale(4)}px;
  padding: 0 ${scale(16)}px;
  margin-top: ${scale(8)}px;
  white-space: nowrap;
  width: fit-content;
  min-width: 100%;
`;

export const StyledMemberChipWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledHeartIcon = styled.img`
  width: ${scale(12)}px;
  height: ${scale(12)}px;
  margin-right: ${scale(2)}px;
  vertical-align: middle;
`;
