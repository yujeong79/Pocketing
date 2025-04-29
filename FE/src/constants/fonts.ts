import { css } from 'styled-components';
import { scaleLetterSpacing } from '@/utils/scale';

export const FontStyles = {
  displayXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 72px;
    line-height: 74px;
    letter-spacing: ${scaleLetterSpacing(72, -4)}px;
  `,
  displayLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 64px;
    line-height: 70px;
    letter-spacing: ${scaleLetterSpacing(64, -4)}px;
  `,
  displayMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 48px;
    line-height: 54px;
    letter-spacing: ${scaleLetterSpacing(48, -4)}px;
  `,
  displaySmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 40px;
    line-height: 44px;
    letter-spacing: ${scaleLetterSpacing(40, -4)}px;
  `,
  headingXlarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 32px;
    line-height: 36px;
    letter-spacing: ${scaleLetterSpacing(32, -4)}px;
  `,
  headingLarge: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 26px;
    line-height: 30px;
    letter-spacing: ${scaleLetterSpacing(26, -4)}px;
  `,
  headingMedium: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 22px;
    line-height: 26px;
    letter-spacing: ${scaleLetterSpacing(22, -4)}px;
  `,
  headingSmall: css`
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
    line-height: 24px;
    letter-spacing: ${scaleLetterSpacing(18, -4)}px;
  `,
  bodyMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: 16px;
    line-height: 24px;
    letter-spacing: ${scaleLetterSpacing(16, -2)}px;
  `,
  bodySmall: css`
    font-family: 'Pretendard-Regular';
    font-size: 14px;
    line-height: 20px;
    letter-spacing: ${scaleLetterSpacing(14, -2)}px;
  `,
  captionMedium: css`
    font-family: 'Pretendard-Regular';
    font-size: 12px;
    line-height: 16px;
    letter-spacing: ${scaleLetterSpacing(12, 0)}px;
  `,
  captionSmall: css`
    font-family: 'Pretendard-Regular';
    font-size: 10px;
    line-height: 12px;
    letter-spacing: ${scaleLetterSpacing(10, 0)}px;
  `,
};
