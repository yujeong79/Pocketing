import styled from 'styled-components/native';
import { View, Image } from 'react-native';
import scale from "@utils/scale";

export const Container = styled(View)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: ${scale(80)}px;
`

export const LogoContainer = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${scale(10)}px;
`;
export const LogoImage = styled(Image)`
    width: ${scale(48)}px;
    height: ${scale(66)}px;
`;
export const LogoText = styled(Image)`
    width: ${scale(152)}px;
    height: ${scale(32)}px;
`;

export const LoginButtonContainer = styled(View)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${scale(8)}px;
`;
export const KakaoLoginButton = styled(Image)`
  width: ${scale(266)}px;
  height: ${scale(40)}px;
`;
export const XLoginButton = styled(Image)`
  width: ${scale(266)}px;
  height: ${scale(40)}px;
`;