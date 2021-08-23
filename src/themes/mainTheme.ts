//put custom theme here

import { createTheme } from '@material-ui/core';

export enum Colors {
  Primary = 'rgba(99, 34, 107, 1)',
  Secondary = 'rgba(147, 10, 10, 1)',
  Background = '#ffffff',
  Box = '#f5f5f5',
  HoverTextFieldFilled = '#F5F5F5',
  PrimaryText = 'rgba(0,0,0,0.87)',
  InitialText = 'rgba(0, 0, 0, 1)',
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
      fontFamily: 'Crimson Text, serif',
      fontSize: '3rem',
      lineHeight: '4.125rem',
      color: Colors.InitialText,
    },
    h2: {
      fontFamily: 'Crimson Text, serif',
      fontSize: '2.25rem',
      lineHeight: '3rem',
      letterSpacing: '0.0025em',
      color: Colors.InitialText,
    },
    h3: {
      fontFamily: 'Crimson Text, serif',
      fontSize: '1.5rem',
      lineHeight: '2.0625rem',
      color: Colors.InitialText,
    },
    h4: {
      fontFamily: 'Barlow, serif',
      fontSize: '1.125rem',
      fontWeight: 'bold',
      lineHeight: '1.5rem',
      letterSpacing: '0.0015em',
      color: Colors.InitialText,
    },
    h5: {
      color: Colors.InitialText,
    },
    h6: {
      color: Colors.InitialText,
    },
    subtitle1: {
      fontFamily: 'Barlow, serif',
      fontSize: '1rem',
      lineHeight: '1.1875rem',
      letterSpacing: '0.0015em',
      color: Colors.InitialText,
    },
    subtitle2: {
      fontFamily: 'Barlow, serif',
      fontSize: '0.875rem',
      fontWeight: 'bold',
      lineHeight: '1.0625rem',
      color: Colors.InitialText,
    },
    body1: {
      fontFamily: 'Barlow, serif',
      fontSize: '1rem',
      lineHeight: '1.5rem',
      letterSpacing: '0.005em',
      color: Colors.InitialText,
    },
    body2: {
      fontFamily: 'Barlow, serif',
      fontSize: '0.875rem',
      lineHeight: '1.0625rem',
      letterSpacing: '0.0025em',
      color: Colors.InitialText,
    },
    button: {
      fontFamily: 'Barlow, serif',
      fontSize: '0.875rem',
      lineHeight: '1.0625rem',
      letterSpacing: '0.02em',
      fontWeight: 500,
      color: Colors.InitialText,
    },
    caption: {
      fontFamily: 'Barlow, serif',
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
      letterSpacing: '0.004em',
      color: Colors.InitialText,
    },
    overline: {
      fontFamily: 'Barlow, serif',
      fontSize: '0.75rem',
      lineHeight: '0.875rem',
      letterSpacing: '0.015em',
      color: Colors.InitialText,
      textTransform: 'none',
    },
  },
});
