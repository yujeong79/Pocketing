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

const moveUp = keyframes`
  from {
    transform: translateY(+30px);
  }
  to {
    transform: translateY(0);
  }
`;

export const SplashPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const Logo = styled.img`
  width: ${scale(64)}px;
  height: ${scale(88)}px;
  transform: translateY(+30px);
  animation: ${moveUp} 1s 1s forwards;
`;

export const LogoText = styled.img`
  opacity: 0;
  width: ${scale(136)}px;
  height: ${scale(32)}px;

  animation: ${fadeIn} 1s 2s forwards;
`;
