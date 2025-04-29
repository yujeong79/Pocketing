const width = window.innerWidth;
const scale = (size: number) => (width / 298) * size;

export function scaleLetterSpacing(fontSize: number, percent: number): number {
  return parseFloat((fontSize * (percent / 100)).toFixed(2));
}

export default scale;
