import React from 'react';
import Login from 'pages/Login';
import { ThemeProvider } from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

const defaultMUITheme = createMuiTheme();

const App = () => (
  <ThemeProvider theme={defaultMUITheme}>
    <Login />
  </ThemeProvider>
);

export default App;
