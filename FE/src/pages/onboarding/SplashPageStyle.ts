import styled, { keyframes } from 'styled-components';
import scale from '@/utils/scale';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const SplashPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Logo = styled.img`
  animation: ${fadeIn} 1s ease;
  width: ${scale(64)}px;
  height: ${scale(88)}px;
`;
