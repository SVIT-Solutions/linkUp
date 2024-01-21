import { createTheme } from '@material-ui/core/styles';

export const lightColors = {
  primary: '#00A3FF',
  secondary: '#00A3FF',
  background: '#F5F5F5',
  paper: '#FFFFFF',
  textPrimary: '#000000',
  textSecondary: '#757575',
  primaryButtonTextColor: '#FFFFFF',
  buttonTextColor: '#00A3FF',
  iconColor: '#00A3FF',
  linkColor: '#00A3FF',
  inputTextColor: '#000000',
  inputBorderColor: '#A6A6A6',
};

export const darkColors = {
  primary: '#1976D2',
  secondary: '#0386D5',
  background: '#0E142C',
  paper: '#1D2645 ',
  textPrimary: '#FFFFFF',
  textSecondary: '#BDBDBD',
  primaryButtonTextColor: '#FFFFFF',
  buttonTextColor: '#00A3FF',
  iconColor: '#FFFFFF',
  linkColor: '#0386D5',
  inputTextColor: '#A6A6A6',
  inputBorderColor: '#A6A6A6',
};

const createCustomTheme = (colors: any) => {
  return createTheme({
    typography: {
      fontFamily: 'CourierPrime-Regular, CourierNew-Regular, sans-serif',
    },
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
      MuiButton: {
        root: {
          color: colors.buttonTextColor,
        },
        containedPrimary: {
          color: colors.primaryButtonTextColor,
        },
      },
      MuiIconButton: {
        root: {
          color: colors.iconColor,
        },
      },
      MuiOutlinedInput: {
        root: {
          color: colors.inputTextColor,
          '& input:-webkit-autofill': {
            color: colors.inputTextColor,
          },
          '& input:-webkit-autofill::first-line': {
            color: colors.inputTextColor,
          },
          '& fieldset': {
            borderColor: colors.inputBorderColor,
          },
        },
      },
      MuiLink: {
        root: {
          color: colors.linkColor,
          cursor: 'pointer',
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
