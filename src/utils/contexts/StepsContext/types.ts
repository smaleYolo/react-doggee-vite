import { PetInfoValues, UserInfoValues } from '@utils/contexts';

export type Steps = 'user' | 'pets' | 'profile';

export interface IStep {
  step: Steps;
  title: string;
  completed: boolean;
  current: boolean;
  step_data?: UserInfoValues | PetInfoValues;
}