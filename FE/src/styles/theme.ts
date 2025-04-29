// 자주 사용하는 값들은 별도로 추출
export const colors = {
  primary: '#F26A6C',
  primary200: '#FBD1D1',
  primary100: '#FDE9E9',
  primary50: '#FEF0F0',

  danger: '#C22B20',
  warning: '#FFE949',
  success: '#00C380',
  info: '#4FA5FF',

  white: '#FFFFFF',
  gray100: '#F5F5F5',
  gray200: '#E0E0E0',
  gray300: '#CCCCCC',
  gray400: '#AFAFAF',
  gray500: '#8C8C8C',
  gray600: '#6B6B6B',
  gray700: '#4E4E4E',
  gray800: '#2C2C2C',
  black: '#000000',
} as const;

export const fontSize = {
  xs: '0.75rem',
  sm: '0.875rem',
  base: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
} as const;

// theme 객체는 유지 (ThemeProvider를 위해)
export const theme = {
  colors,
  fontSize,
} as const;

export type Theme = typeof theme;
