import styled, { keyframes } from 'styled-components';

import { colors } from '@/styles/theme';
import scale from '@/utils/scale';
import { FontStyles } from '@/constants/fonts';

const slideDown = keyframes`
  from {
    transform: translateY(0);
    opacity: 0;
  }
  to {
    transform: translateY(100%);
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

export const ToastContainer = styled.div`
  position: fixed;
  top: ${scale(32)}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;

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
