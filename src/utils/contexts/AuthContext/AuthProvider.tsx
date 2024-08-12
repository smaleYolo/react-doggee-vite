import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '@utils/contexts';
import { toast } from 'react-toastify';
import { useIntl } from '@features/intl';

export interface IAuthContext {
  userId: string | undefined;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isAuthLoading: boolean;
  login: (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean | undefined) => void;
  logout: () => void;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {translateMessage} = useIntl()
  const [userId, setUserId] = useState<string | undefined>(() => Cookies.get('userId'));
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const setCookie = (name: string, value: string | number): void => {
    Cookies.set(name, String(value));
  };

  const removeCookie = (name: string): void => {
    Cookies.remove(name);
  };

  const logout = (): void => {
    setIsAuth(false);
    setUserId(undefined);
    ['access_token', 'refresh_token', 'userId'].forEach(cookieName => removeCookie(cookieName));
    toast.info(translateMessage('success.userLogout'));
  };

  const login = (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean): void => {
    setCookie('access_token', access_token);
    setCookie('userId', userId);
    setUserId(String(userId));

    if (!isNotUserDevice) {
      setCookie('refresh_token', refresh_token);
    }
    setIsAuth(true);
  };

  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setIsAuth(true);
    }
    setIsAuthLoading(false);
  }, []);

  const value: IAuthContext = {
    userId,
    isAuth,
    setIsAuth,
    isAuthLoading,
    logout,
    login
  };

  if (isAuthLoading) return null;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
