import styled from 'styled-components';
import scale from '@/utils/scale';

export const SignInPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: ${scale(160)}px;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${scale(10)}px;
`;

export const LogoImage = styled.img`
  width: ${scale(64)}px;
  height: ${scale(88)}px;
`;

export const LogoText = styled.img`
  width: ${scale(136)}px;
  height: ${scale(32)}px;
`;

export const LoginButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;

export const KakaoLoginButton = styled.img`
  cursor: pointer;
  width: ${scale(266)}px;
  height: ${scale(40)}px;
`;

export const XLoginButton = styled.img`
  cursor: pointer;
  width: ${scale(266)}px;
  height: ${scale(40)}px;
`;
