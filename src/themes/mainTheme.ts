//put custom theme here

import { createTheme } from '@mui/material';

export enum Colors {
  Primary = 'rgba(1, 1, 107, 1)',
  Secondary = 'rgba(147, 10, 10, 1)',
  Background = '#ffffff',
  SchemaBackground = '#f2f2f2',
  PrimaryText = 'rgb(50,50,50)',
  DisabledText = 'rgb(150,150,150)',
  Warning = 'rgba(147, 10, 10, 1)',
  EnhancedRadioFocusBackground = 'rgba(99, 34, 107, 0.15)',
}

export default createTheme({
  palette: {
    primary: {
      main: '#ffffff',
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
      fontSize: '0.9rem',
      fontWeight: 400,
      lineHeight: '1.5rem',
      color: Colors.PrimaryText,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          background: Colors.Background,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          '&:hover, &:active': {
            background: Colors.EnhancedRadioFocusBackground,
          },
        },
      },
    },
  },
});
