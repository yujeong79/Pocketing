import styled from "styled-components";
import { Image } from "react-native";
import scale from "@utils/scale";

export const Logo = styled(Image)`
    width: ${scale(48)}px;
    height: ${scale(66)}px;
    margin: auto;
`;
