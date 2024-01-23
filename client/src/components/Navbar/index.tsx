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
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/styles';
import { RouteNames } from 'router';
import { AuthContext } from 'context/AuthContext';
import AuthModal, {
  AuthModalNames,
} from 'components/Modals/AuthModals/AuthModal';
import ColorThemeSwitchButton from 'components/UI/Buttons/ColorThemeSwitchButton';
import LanguageSelector from 'components/UI/LanguageSelector';
import RootButton from 'components/UI/Buttons/RootButton';
import LinkUpLogo from 'components/UI/Logo/LinkUpLogo';

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: 'transparent',
    boxShadow: 'none',
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
    if (pathname === RouteNames.HOME) {
      setModalTypeOpen(AuthModalNames.LOGIN);
    } else {
      router(RouteNames.LOGIN);
    }
  };

  const registerCLickHandler = () => {
    if (pathname === RouteNames.HOME) {
      setModalTypeOpen(AuthModalNames.REGISTER);
    } else {
      router(RouteNames.REGISTER);
    }
  };

  const logoutClickHandler = () => {
    localStorage.removeItem('token');
    authContext?.setIsAuth(false);
    authContext?.setUser(null);
    router(RouteNames.HOME);
  };

  const closeModal = () => setModalTypeOpen(null);

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
            <LinkUpLogo onClick={logoClickHandler} />
            <Box style={{ display: 'flex', alignItems: 'center' }}>
              <LanguageSelector style={{ marginRight: '20px' }} />
              <ColorThemeSwitchButton style={{ marginRight: '20px' }} />
              {authContext?.isAuth ? (
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      style={{ padding: 0, marginLeft: '6px' }}
                    >
                      <Avatar src={authContext.user?.avatarUrl} />
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <AuthModal modalTypeOpen={modalTypeOpen} onClose={closeModal} />
    </>
  );
};

export default Navbar;
