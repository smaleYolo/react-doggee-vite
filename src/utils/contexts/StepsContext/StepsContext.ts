import { createContext, useContext } from 'react';
import { IStepsContext } from '@utils/contexts';



export const StepsContext = createContext<IStepsContext | undefined>(undefined)

export const useSteps = (): IStepsContext => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('useSteps must be used within a StepsProvider');
  }
  return context;
}