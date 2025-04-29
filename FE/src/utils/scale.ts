export function scaleLetterSpacing(fontSize: number, percent: number): number {
  return parseFloat((fontSize * (percent / 100)).toFixed(2));
}
