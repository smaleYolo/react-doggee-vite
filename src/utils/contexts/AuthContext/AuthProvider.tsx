import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@utils/api';
import { AuthContext } from '@utils/contexts';
import { IUser } from '@utils/models';
import { toast } from 'react-toastify';
import { useIntl } from '@features/intl';

export interface UserInfoValues {
  name: string;
  city: string;
  birthdate: string;
}

export interface UpdateUserInfoPayload {
  name: IUser['name'];
  city: IUser['city'];
  birthdate: IUser['birthdate'];
}

export interface PetInfoValues {
  name: string;
  breed: string;
  birthdate: string;
  weight?: string;
}

export interface IRefreshResponse {
  access_token: string;
  refresh_token: string;
}

export interface IMessageResponse {
  message: string;
}

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

  const logout = () => {
    setIsAuth(false);
    setUserId(undefined);
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('userId');
    toast.info(translateMessage('success.userLogout'))
  };

  const login = (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean) => {
    Cookies.set('access_token', access_token);
    Cookies.set('userId', String(userId));
    setUserId(String(userId));

    if (!isNotUserDevice) {
      Cookies.set('refresh_token', refresh_token);
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
