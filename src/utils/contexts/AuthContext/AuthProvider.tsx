import { ReactNode, useState } from 'react';
import { AuthContext } from '@utils/contexts/AuthContext/AuthContext.ts';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);

  const AuthHandler = (authStatus: boolean): void => {
    setIsAuth(authStatus);
  };

  return (
    <AuthContext.Provider value={{ isAuth, AuthHandler }}>
      {children}
    </AuthContext.Provider>
  );
};