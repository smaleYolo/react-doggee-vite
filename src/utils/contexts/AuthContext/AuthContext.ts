import { createContext, useContext } from 'react';

export interface AuthContextProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
  logout: () => void;
  login: (access_token: string, userId: number, isNotUserDevice?: boolean | undefined) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};