import React from 'react';
import { StylesProvider, ThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import appTheme from '../appTheme';
import GlobalStyle from './styles/Global';
import Login from 'pages/Login';
import Layout from './Layout/Layout';

const App = () => (
  <StylesProvider injectFirst>
    <ThemeProvider theme={appTheme}>
      <StyledComponentsThemeProvider theme={appTheme}>
        <GlobalStyle />
        <Layout />
      </StyledComponentsThemeProvider>
    </ThemeProvider>
  </StylesProvider>
);

export default App;
