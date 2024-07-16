import { createContext, useContext } from 'react';

export type Steps = 'user' | 'pets' | 'profile'

export interface UserContextProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
  logout: () => void;
  login: (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean | undefined) => void;
  refreshToken: () => Promise<void>;
  currentStep: Steps;
  toggleStep: (step: Steps) => void;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
