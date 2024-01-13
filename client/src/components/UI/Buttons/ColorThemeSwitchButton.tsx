import React, { CSSProperties, FC, useContext } from 'react';
import { Box, useTheme } from '@material-ui/core';

// @ts-ignore
import { ReactComponent as LightThemeIcon } from 'assets/svg/LightThemeIcon.svg';
// @ts-ignore
import { ReactComponent as DarkThemeIcon } from 'assets/svg/DarkThemeIcon.svg';
import { makeStyles } from '@material-ui/styles';
import { AuthContext } from 'context/AuthContext';
import { ThemesIds } from 'themes';
import clsx from 'clsx';

interface ColorThemeSwitchButtonProps {
  style: CSSProperties;
}

const ColorThemeSwitchButton: FC<ColorThemeSwitchButtonProps> = ({ style }) => {
  const authContext = useContext(AuthContext);
  const theme = useTheme();

  const useStyles = makeStyles({
    wrapper: { display: 'flex', alignItems: 'center' },
    icon: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      '& path': {
        stroke: theme?.palette?.text?.primary,
        strokeWidth: '0.1px',
        fill: theme?.palette?.text?.primary,
      },
    },
    activeIcon: {
      '& path': {
        stroke: theme?.palette?.secondary?.main,
        fill: theme?.palette?.secondary?.main,
      },
    },
    iconDelimiter: {
      width: '1.2px',
      height: '17px',
      backgroundColor: theme?.palette?.text?.primary,
      margin: '0 5.56px',
    },
  });

  const classes = useStyles();

  const toggleTheme = (theme: ThemesIds) => () => {
    authContext?.setAppThemeId(theme);
    localStorage.setItem('themeId', String(theme));
  };

  return (
    <Box className={classes.wrapper} style={style}>
      <LightThemeIcon
        onClick={toggleTheme(ThemesIds.LIGHT)}
        className={
          authContext?.appThemeId === ThemesIds.LIGHT
            ? clsx(classes.icon, classes.activeIcon)
            : classes.icon
        }
      />
      <div className={classes.iconDelimiter} />
      <DarkThemeIcon
        onClick={toggleTheme(ThemesIds.DARK)}
        className={
          authContext?.appThemeId === ThemesIds.DARK
            ? clsx(classes.icon, classes.activeIcon)
            : classes.icon
        }
      />
    </Box>
  );
};

export default ColorThemeSwitchButton;
