//put custom theme here

import { createTheme } from '@material-ui/core';

export enum Colors {
  Primary = 'rgba(99, 34, 107, 1)',
  Secondary = 'rgba(147, 10, 10, 1)',
  Background = '#ffffff',
  HoverTextFieldFilled = '#F5F5F5',
  PrimaryText = 'rgb(58,58,58)',
  Warning = 'rgba(147, 10, 10, 1)',
}

export default createTheme({
  palette: {
    primary: {
      main: Colors.Primary,
    },
    secondary: {
      main: Colors.Secondary,
    },
    error: { main: Colors.Warning },
    text: {
      primary: Colors.PrimaryText,
    },
    background: {
      default: Colors.Background,
    },
  },
  typography: {
    fontFamily: 'Barlow,  sans-serif',
    h1: {
      fontFamily: 'Source Sans Pro,Helvetica Neue,Helvetica,Arial,sans-serif',
      fontSize: '1.5rem',
      fontWeight: 300,
      color: Colors.PrimaryText,
    },
    body1: {
      fontFamily: 'Barlow, sans-serif',
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: '1.8rem',
      letterSpacing: '0.005em',
      color: Colors.PrimaryText,
    },
  },
});
