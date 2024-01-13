import { createTheme } from '@mui/material';

export const lightColors = {
  primary: '#2196F3',
  secondary: '#FFC107',
  background: '#FFFFFF',
  paper: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#757575',
  iconColor: '#000000',
  linkColor: '#1976D2',
};

export const darkColors = {
  primary: '#0D47A1',
  secondary: '#FFA000',
  background: '#0E142C',
  paper: '#1D2645 ',
  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  iconColor: '#FFFFFF',
  linkColor: '#1976D2',
};

const lightTheme = createTheme({
  palette: {
    primary: {
      main: lightColors.primary,
    },
    secondary: {
      main: lightColors.secondary,
    },
    background: {
      default: lightColors.background,
      paper: lightColors.paper,
    },
    text: {
      primary: lightColors.textPrimary,
      secondary: lightColors.textSecondary,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: lightColors.iconColor,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: lightColors.linkColor,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: darkColors.primary,
    },
    secondary: {
      main: darkColors.secondary,
    },
    background: {
      default: darkColors.background,
      paper: darkColors.paper,
    },
    text: {
      primary: darkColors.textPrimary,
      secondary: darkColors.textSecondary,
    },
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: darkColors.iconColor,
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: darkColors.linkColor,
        },
      },
    },
  },
});

export enum ThemesIds {
  LIGHT = 0,
  DARK = 1,
}

export const Themes = [lightTheme, darkTheme];
export const ThemeColors = [lightColors, darkColors];
