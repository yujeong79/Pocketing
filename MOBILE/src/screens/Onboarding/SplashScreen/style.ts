import styled from "styled-components";
import { View, Image } from "react-native";

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const LogoContainer = styled(View)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
`;

export const Logo = styled(Image)`
    width: 48px;
    height: 66px;
`;

export const LogoText = styled(Image)`
    width: 136px;
    height: 32px;
`;