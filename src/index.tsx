import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components';
import { StyledEngineProvider, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { StylesProvider } from '@mui/styles';
import mainTheme from './themes/mainTheme';
import { USE_MOCK_DATA } from './utils/constants';
import { interceptRequestsOnMock } from './api/mock-interceptors';
import App from './App';
import ReactDOM from 'react-dom';

if (USE_MOCK_DATA) {
  interceptRequestsOnMock();
}
ReactDOM.render(
  <StylesProvider injectFirst>
    <StyledEngineProvider injectFirst>
      <StyledComponentsThemeProvider theme={mainTheme}>
        <MuiThemeProvider theme={mainTheme}>
          <CssBaseline />
          <App />
        </MuiThemeProvider>
      </StyledComponentsThemeProvider>
    </StyledEngineProvider>
  </StylesProvider>,
  document.getElementById('root')
);
