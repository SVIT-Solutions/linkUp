import { createTheme } from '@material-ui/core/styles';

export const lightColors = {
  primary: '#00A3FF',
  secondary: '#00A3FF',
  background: '#FFFFFF',
  paper: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#757575',
  iconColor: '#000000',
  linkColor: '#00A3FF',
};

export const darkColors = {
  primary: '#1976D2',
  secondary: '#0386D5',
  background: '#0E142C',
  paper: '#1D2645 ',
  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  iconColor: '#FFFFFF',
  linkColor: '#0386D5',
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
