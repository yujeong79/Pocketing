const BASE_SCREEN_WIDTH = 298;

const getCurrentScreenWidth = () => window.innerWidth;

const scale = (size: number) => {
  const currentScreenWidth = getCurrentScreenWidth();
  return (currentScreenWidth / BASE_SCREEN_WIDTH) * size;
};

export function scaleLetterSpacing(fontSize: number, percent: number): number {
  return parseFloat((fontSize * (percent / 100)).toFixed(2));
}

export default scale;
