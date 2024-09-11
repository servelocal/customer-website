import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${theme.fonts.body};
    color: ${theme.colors.primary};
    margin: 0;
    padding: 0;
  }
`;
