import styled from "styled-components";
import { View, Image } from "react-native";
import scale from "@utils/scale";

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const Logo = styled(Image)`
    width: ${scale(48)}px;
    height: ${scale(66)}px;
`;
