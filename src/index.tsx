import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { StylesProvider, ThemeProvider as MUIThemeProvider } from '@material-ui/styles';
import mainTheme from './themes/mainTheme';
import { USE_MOCK_DATA } from './utils/constants';
import { interceptRequestsOnMock } from './api/mock-interceptors';

if (USE_MOCK_DATA) {
  interceptRequestsOnMock();
}
ReactDOM.render(
  <StylesProvider injectFirst>
    <ThemeProvider theme={mainTheme}>
      <MUIThemeProvider theme={mainTheme}>
        <CssBaseline />
        <App />
      </MUIThemeProvider>
    </ThemeProvider>
  </StylesProvider>,
  document.getElementById('root')
);
