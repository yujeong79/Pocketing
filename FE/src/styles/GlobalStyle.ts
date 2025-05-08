import { createGlobalStyle } from 'styled-components';

import { theme } from './theme';
import './font.css';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    font-family: 'Pretendard-Regular', 'Pretendard-SemiBold', system-ui, Avenir, Helvetica, Arial, sans-serif;
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
