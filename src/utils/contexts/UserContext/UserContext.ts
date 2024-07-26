import { createContext, useContext } from 'react';
import { IUserContext } from '@utils/contexts';



export const UserContext = createContext<IUserContext | undefined>(undefined);

export const useUser = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
