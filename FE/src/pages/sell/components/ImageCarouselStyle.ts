import styled from 'styled-components';
import scale from '@/utils/scale';
import { colors } from '@/styles/theme';

export const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: ${scale(12)}px;
  overflow: hidden;
`;

export const SlideWindow = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(${scale(168)}px + ${scale(149)}px * 2 + ${scale(60)}px);
`;

export const ImageWrapper = styled.div<{ $isSelected: boolean }>`
  flex-shrink: 0;
  margin: 0 10px;
  transition: all 0.3s ease;
  width: ${(p) => (p.$isSelected ? `${scale(168)}px` : `${scale(149)}px`)};
  height: ${(p) => (p.$isSelected ? `${scale(260)}px` : `${scale(230)}px`)};
  opacity: ${(p) => (p.$isSelected ? 1 : 0.5)};
`;

export const CarouselImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${scale(8)}px;
`;

export const EmptySlot = styled.div<{ size: 'large' | 'small' }>`
  flex-shrink: 0;
  margin: 0 10px;
  width: ${(p) => (p.size === 'large' ? `${scale(168)}px` : `${scale(149)}px`)};
  height: ${(p) => (p.size === 'large' ? `${scale(260)}px` : `${scale(230)}px`)};
`;

export const DotContainer = styled.div`
  display: flex;
  gap: ${scale(4)}px;
  margin-top: ${scale(8)}px;
`;

export const Dot = styled.div<{ $isActive: boolean }>`
  flex-shrink: 0;
  width: ${(p) => (p.$isActive ? `${scale(20)}px` : `${scale(10)}px`)};
  height: ${scale(10)}px;
  border-radius: ${(p) => (p.$isActive ? '40%' : '50%')};
  background-color: ${(p) => (p.$isActive ? colors.gray200 : colors.white)};
  border: ${(p) => (p.$isActive ? 'none' : `${scale(1)}px solid ${colors.gray200}`)};
  transition: all 0.3s ease;
`;

export const ArrowButton = styled.button<{ direction: 'left' | 'right' }>`
  position: absolute;
  top: 50%;
  ${(p) => (p.direction === 'left' ? 'left: 20px;' : 'right: 20px;')}
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 2;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
  }

  &::before {
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid #333;
    border-right: 2px solid #333;
    transform: ${(p) => (p.direction === 'left' ? 'rotate(-135deg)' : 'rotate(45deg)')};
  }
`;
