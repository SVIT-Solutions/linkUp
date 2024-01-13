import React, { FC, useContext, useState } from 'react';
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { AuthContext } from 'context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteNames } from 'router';
import { Brightness4, Brightness7 } from '@material-ui/icons';
import { ThemeColors, ThemesIds } from 'themes';
import AuthModal, {
  AuthModalNames,
} from 'components/Modals/AuthModals/AuthModal';
import LanguageSelector from 'components/UI/LanguageSelector';
import { makeStyles } from '@material-ui/styles';
import RootButton from 'components/UI/Buttons/RootButton';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
  },
  logo: {
    cursor: 'pointer',
    display: 'flex',
  },
}));

const Navbar: FC = () => {
  const classes = useStyles();

  const { t } = useTranslation();
  const router = useNavigate();
  const { pathname } = useLocation();
  const authContext = useContext(AuthContext);
  const [modalTypeOpen, setModalTypeOpen] = useState<null | AuthModalNames>(
    null
  );

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickUserMenuItem = (itemClickHandler: () => void) => () => {
    handleCloseUserMenu();
    itemClickHandler();
  };

  const logoClickHandler = () => router(RouteNames.HOME);

  const loginCLickHandler = () => {
    if (pathname === RouteNames.LOGIN || pathname === RouteNames.REGISTER) {
      router(RouteNames.LOGIN);
    } else {
      setModalTypeOpen(AuthModalNames.LOGIN);
    }
  };

  const registerCLickHandler = () => {
    if (pathname === RouteNames.LOGIN || pathname === RouteNames.REGISTER) {
      router(RouteNames.REGISTER);
    } else {
      setModalTypeOpen(AuthModalNames.REGISTER);
    }
  };

  const logoutClickHandler = () => {
    localStorage.removeItem('token');
    authContext?.setIsAuth(false);
    authContext?.setUser(null);
    router(RouteNames.HOME);
  };

  const closeModal = () => setModalTypeOpen(null);

  const toggleTheme = () => {
    const newThemeId =
      authContext?.appThemeId === ThemesIds.LIGHT
        ? ThemesIds.DARK
        : ThemesIds.LIGHT;
    authContext?.setAppThemeId(newThemeId);
    localStorage.setItem('themeId', String(newThemeId));
  };

  const settings = [
    { title: t('account'), onClick: () => {} },
    { title: t('settings'), onClick: () => {} },
    { title: t('logout'), onClick: logoutClickHandler },
  ];

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <Box>
              <Box className={classes.logo} onClick={logoClickHandler}>
                <Typography variant="h5" color="secondary">
                  /
                </Typography>
                <Typography variant="h5">Link</Typography>
                <Typography variant="h5" color="secondary">
                  Up
                </Typography>
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LanguageSelector sx={{ mr: 2 }} />
              <Box sx={{ ml: 1, mr: 2 }}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {authContext?.appThemeId === ThemesIds.DARK ? (
                    <Brightness7 />
                  ) : (
                    <Brightness4 />
                  )}
                </IconButton>
              </Box>
              {authContext?.isAuth ? (
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      style={{ padding: 0 }}
                    >
                      <Avatar alt="Remy Sharp" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    style={{ marginTop: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.title}
                        onClick={handleClickUserMenuItem(setting.onClick)}
                      >
                        <Typography style={{ textAlign: 'center' }}>
                          {setting.title}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ) : (
                <Box>
                  <RootButton
                    onClick={loginCLickHandler}
                    style={{ marginRight: '8px' }}
                  >
                    {t('login')}
                  </RootButton>
                  <RootButton
                    onClick={registerCLickHandler}
                    variant="contained"
                    color="primary"
                  >
                    {t('singup')}
                  </RootButton>
                </Box>
              )}{' '}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthModal modalTypeOpen={modalTypeOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
