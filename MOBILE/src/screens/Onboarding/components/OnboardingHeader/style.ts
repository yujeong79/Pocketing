import styled from "styled-components/native";
import { View, Image, TouchableOpacity } from "react-native";

import scale from "@utils/scale";

export const Container = styled(TouchableOpacity)`
  padding: 24px 16px;
`

export const BackButton = styled(View)`
  width: ${scale(28)}px;
  height: ${scale(48)}px;
`

export const BackButtonImage = styled(Image)`
  width: ${scale(6)}px;
  height: ${scale(12)}px;
`