import React, { useState, FC, useEffect } from 'react';
import AppRouter from 'components/AppRouter';
import { AuthContext } from 'context/AuthContext';
import { IUser } from 'models/IUser';
import Navbar from 'components/Navbar';
import { Themes, ThemesIds } from 'themes';
import { VERIFY_TOKEN } from 'api/mutations';
import { useMutation } from '@apollo/client';
import { getWebsiteSettings } from 'utils';
import { useTranslation } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { Container, CssBaseline } from '@material-ui/core';

const App: FC = () => {
  const { i18n } = useTranslation();
  const [verifyTokenMutation, { loading, error }] = useMutation(VERIFY_TOKEN);

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [appThemeId, setAppThemeId] = useState<ThemesIds>(ThemesIds.DARK);

  const tokenVerification = async () => {
    if (isAuth) return;
    const token = localStorage.getItem('token');
    if (!token) return;
    const response = await verifyTokenMutation({ variables: { token } });
    const { success, user } = response.data.verifyToken;
    if (!success) return;
    delete user.__typename;
    setUser(user);
    setIsAuth(true);
  };

  const getSettigns = () => {
    const settings = getWebsiteSettings();
    if (typeof settings?.themeId === 'number') setAppThemeId(settings.themeId);
    if (typeof settings?.language === 'string')
      i18n.changeLanguage(settings.language);
  };

  useEffect(() => {
    tokenVerification();
    getSettigns();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuth, setIsAuth, user, setUser, appThemeId, setAppThemeId }}
    >
      <ThemeProvider theme={Themes[appThemeId]}>
        <CssBaseline />
        <Navbar />
        <Container maxWidth="lg">
          <AppRouter />
        </Container>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
