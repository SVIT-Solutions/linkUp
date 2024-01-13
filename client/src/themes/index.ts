import { createTheme } from '@material-ui/core/styles';

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

const createCustomTheme = (colors: any) => {
  return createTheme({
    palette: {
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      text: {
        primary: colors.textPrimary,
        secondary: colors.textSecondary,
      },
    },
    overrides: {
      MuiIconButton: {
        root: {
          color: colors.iconColor,
        },
      },
      MuiLink: {
        root: {
          color: colors.linkColor,
        },
      },
      MuiTypography: {
        colorTextSecondary: {
          color: colors.textSecondary,
        },
      },
      MuiAppBar: {
        colorPrimary: {
          color: colors.textPrimary,
        },
      },
    },
  });
};

export const lightTheme = createCustomTheme(lightColors);
export const darkTheme = createCustomTheme(darkColors);

export enum ThemesIds {
  LIGHT = 0,
  DARK = 1,
}

export const Themes = [lightTheme, darkTheme];
export const ThemeColors = [lightColors, darkColors];
