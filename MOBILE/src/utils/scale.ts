import { Dimensions, Platform } from 'react-native';

const BASE_SCREEN_WIDTH = 298;

const getCurrentScreenWidth = () => {
    if (Platform.OS === 'web') {
        return window.innerWidth;
    }
    return Dimensions.get('window').width;
};

const scale = (size: number) => {
  const currentScreenWidth = getCurrentScreenWidth();
  return (currentScreenWidth / BASE_SCREEN_WIDTH) * size;
};

export function scaleLetterSpacing(fontSize: number, percent: number): number {
  return parseFloat((fontSize * (percent / 100)).toFixed(2));
}

export default scale;