import { FontStyles } from '@/constants/fonts';
import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import styled, { keyframes } from 'styled-components';

export const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

export const ToastWrapper = styled.div`
  position: fixed;
  top: ${scale(32)}px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  z-index: 1000;
  pointer-events: none;
`;

export const ToastContainer = styled.div`
  animation:
    ${slideDown} 0.3s ease-out,
    ${fadeOut} 0.3s ease-out 2.7s;
`;

export const ToastContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${scale(4)}px;

  width: ${scale(266)}px;
  padding: ${scale(8)}px ${scale(8)}px;
  border-radius: ${scale(5)}px;
  background-color: ${colors.primary};
`;

export const ToastIcon = styled.img`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
`;

export const ToastText = styled.div`
  ${FontStyles.captionMedium}
  color: ${colors.white};
`;
