import React, { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@utils/api';
import { AuthContext } from '@utils/contexts';
import { IUser } from '@utils/models';


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
  refreshToken: () => Promise<void>;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userId, setUserId] = useState<string | undefined>(() => Cookies.get('userId'));
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = () => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('userId');
    Cookies.remove('NotUserDevice');
    setIsAuth(false);
    setUserId(undefined);
  }

  const login = (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean) => {
    //TODO: Костыль для обновления selectedDate и календаря в целом
    window.location.href = '/'
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token);
    Cookies.set('userId', String(userId));
    setUserId(String(userId));

    if (isNotUserDevice) {
      Cookies.set('NotUserDevice', `true_${userId}`);
    } else {
      Cookies.remove('NotUserDevice');
    }
    setIsAuth(true);
    // setProfileSteps(initialStateSteps); // Reset state when a new user logs in
  };

  const refreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    if (!refresh_token) {
      logout();
      return;
    }
    try {
      const response = await api.post<IRefreshResponse, { refresh_token: string }>('/auth/refresh-token', { refresh_token });
      const { access_token, refresh_token: new_refresh_token } = response;

      Cookies.set('access_token', access_token);
      Cookies.set('refresh_token', new_refresh_token);
      setIsAuth(true);
    } catch (error) {
      logout();
    }
  }

  useEffect(() => {
    const authCookie = Cookies.get('access_token');
    const userIdCookie = Cookies.get('userId');
    const notUserDeviceCookie = Cookies.get('NotUserDevice');

    if (authCookie && notUserDeviceCookie) {
      const [notUserDeviceFlag, notUserDeviceUserId] = notUserDeviceCookie.split('_');
      if (notUserDeviceFlag === 'true' && notUserDeviceUserId === userIdCookie) {
        logout();
      } else {
        Cookies.remove('NotUserDevice');
        setIsAuth(true);
      }
    } else if (authCookie) {
      setIsAuth(true);
    } else {
      refreshToken();
    }
    setIsAuthLoading(false);
  }, [logout, refreshToken]);


  const value: IAuthContext = {
    userId,
    isAuth,
    setIsAuth,
    isAuthLoading,
    logout,
    login,
    refreshToken
  };

  if (isAuthLoading) return null;


  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
