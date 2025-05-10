import styled, { css, keyframes } from 'styled-components';
import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition:
    visibility 0.3s,
    opacity 0.3s;
`;

export const ModalContainer = styled.div<{ $isOpen: boolean; $height?: string }>`
  background-color: white;
  width: 100%;
  height: ${({ $height }) => $height || '95vh'};
  max-height: 95vh;
  border-radius: ${scale(20)}px ${scale(20)}px 0 0;
  padding: ${scale(28)}px ${scale(16)}px;
  position: relative;
  display: flex;
  flex-direction: column;

  animation: ${({ $isOpen }) =>
    $isOpen
      ? css`
          ${slideUp} 0.3s ease-out forwards
        `
      : css`
          ${slideDown} 0.3s ease-out forwards
        `};
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: ${scale(4)}px;
`;

export const ModalTitle = styled.div`
  ${FontStyles.headingSmall};
  color: ${colors.primary};
`;

export const CloseButton = styled.img`
  width: ${scale(24)}px;
  height: ${scale(24)}px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
`;
