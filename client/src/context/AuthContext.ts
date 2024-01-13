import { IUser } from 'models/IUser';
import { createContext, Dispatch, SetStateAction } from 'react';
import { ThemesIds } from 'themes';

interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  appThemeId: ThemesIds;
  setAppThemeId: Dispatch<SetStateAction<ThemesIds>>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
