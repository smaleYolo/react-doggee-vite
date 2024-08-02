import { createContext, useContext } from 'react';
import { IDogsContext } from '@utils/contexts';



export const DogsContext = createContext<IDogsContext | undefined>(undefined)

export const useDogs = (): IDogsContext => {
  const context = useContext(DogsContext);
  if (!context) {
    throw new Error('useDogs must be used within a DogsProvider');
  }
  return context;
}