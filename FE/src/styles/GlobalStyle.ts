import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';
import PretendardRegular from '@/assets/fonts/Pretendard-Regular.otf';
import PretendardSemiBold from '@/assets/fonts/Pretendard-SemiBold.otf';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url(${PretendardRegular}) format('opentype');
    font-style: normal;
  }

  @font-face {
    font-family: 'Pretendard-SemiBold';
    src: url(${PretendardSemiBold}) format('opentype');
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: 'Pretendard-Regular', system-ui, Avenir, Helvetica, Arial, sans-serif;
  }

  body {
    color: ${theme.colors.gray800};
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  input {
    outline: none;
  }
`;
