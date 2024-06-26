import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { AuthContext } from '@contexts/AuthContext/AuthContext';
import Cookies from 'js-cookie';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('userId');
    Cookies.remove('NotUserDevice');
    setIsAuth(false);
  }, []);

  const login = useCallback((access_token: string, userId: number, isNotUserDevice?: boolean) => {
      Cookies.set('access_token', access_token);
      Cookies.set('userId', String(userId));
      if (isNotUserDevice) {
        Cookies.set('NotUserDevice', `true_${userId}`);
      } else {
        Cookies.remove('NotUserDevice');
      }
      setIsAuth(true);
  }, []);

  useEffect(() => {
    const authCookie = Cookies.get('access_token');
    const userIdCookie = Cookies.get('userId');
    const notUserDeviceCookie = Cookies.get('NotUserDevice');

    if (authCookie && notUserDeviceCookie) {
      const [notUserDeviceFlag, notUserDeviceUserId] = notUserDeviceCookie.split('_'); //`true_${userId} = true_666`

      if (notUserDeviceFlag === 'true' && notUserDeviceUserId === userIdCookie) {
        logout();
      } else {
        Cookies.remove('NotUserDevice');
        setIsAuth(true);
      }
    } else if (authCookie) {
      setIsAuth(true);
    }

    setIsLoading(false);
  }, [logout]);

  if (isLoading) return null;

  const value = {
    isAuth,
    setIsAuth,
    isLoading,
    logout,
    login
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
