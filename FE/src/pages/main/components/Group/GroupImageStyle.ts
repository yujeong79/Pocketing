import styled from 'styled-components';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

interface StyledGroupImageProps {
  $isSelected?: boolean;
}

export const StyledGroupImage = styled.button<StyledGroupImageProps>`
  width: ${scale(44)}px;
  height: ${scale(44)}px;
  border-radius: ${scale(44)}px;
  border: ${scale(1.1)}px solid
    ${({ $isSelected }) => ($isSelected ? colors.primary : colors.gray400)};
  overflow: hidden;
  cursor: pointer;
  background: none;
  margin: ${scale(8)}px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s ease;
  padding: 0;

  img {
    width: ${scale(14)}px;
    height: ${scale(14)}px;
    object-fit: contain;
    pointer-events: none;
  }

  span {
    font-family: 'Pretendard';
    font-weight: 600;
    font-size: ${scale(14)}px;
    pointer-events: none;
  }

  &[data-type='add'] {
    background-color: ${colors.gray100};
    border-style: dashed;
  }

  &[data-type='interest'] img,
  &[data-type='all'] img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledGroupImageWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledGroupImageList = styled.div`
  display: flex;
  gap: ${scale(8)}px;
  padding: 0 ${scale(16)}px;
  white-space: nowrap;
  width: fit-content;
  min-width: 100%;
`;
