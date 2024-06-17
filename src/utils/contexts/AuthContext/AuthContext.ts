import { createContext, useContext } from 'react';

interface AuthContextProps {
  isAuth: boolean;
  AuthHandler: (authStatus: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};