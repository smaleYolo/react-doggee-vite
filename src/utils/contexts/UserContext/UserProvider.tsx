import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@utils/api';
import { UserContext } from '@utils/contexts';

export type Steps = 'user' | 'pets' | 'profile';

export interface IStep {
  step: Steps;
  title: string;
  completed: boolean;
  current: boolean;
  step_data?: UserInfoValues | PetInfoValues;
}

export interface UserInfoValues {
  name: string;
  city: string;
  birthdate: string;
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

export interface IUserContext {
  userId: string | undefined;
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isAuthLoading: boolean;
  login: (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean | undefined) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;

  currentStepTitle: string;
  toggleStep: (step: Steps) => void;
  profileSteps: IStep[];
  setProfileSteps: (steps: IStep[]) => void;
  completeStep: (step: Steps) => void;
  updateStepData: (newStepData: UserInfoValues | PetInfoValues, step: Steps) => void;
}


export const UserProvider = ({ children }: { children: ReactNode }) => {

  //Auth Context
  const [userId, setUserId] = useState<string | undefined>(() => Cookies.get('userId'));
  const [isAuth, setIsAuth] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const logout = () => {

    //TODO: Clear all cookie fn
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('userId');
    Cookies.remove('NotUserDevice');
    setIsAuth(false);
  };

  const login = (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean) => {
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
  };

  const refreshToken = async () => {
    const refresh_token = Cookies.get('refresh_token');
    if (!refresh_token) {
      logout();
      return;
    }
    try {
      const response = await api.post<IRefreshResponse, {
        refresh_token: string
      }>('/auth/refresh-token', { refresh_token });
      const { access_token, refresh_token: new_refresh_token } = response;

      Cookies.set('access_token', access_token);
      Cookies.set('refresh_token', new_refresh_token);
      setIsAuth(true);
    } catch (error) {
      logout();
    }
  };

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





  //ProfileSteps Context
  const initialStateSteps: IStep[] = [
    {
      'step': 'user', 'title': 'step.title.user', 'completed': false, 'current': true, 'step_data': {
        'name': '',
        'city': '',
        'birthdate': ''
      }
    },
    {
      'step': 'pets', 'title': 'step.title.pets', 'completed': false, 'current': false, 'step_data': {
        'name': '',
        'breed': '',
        'birthdate': '',
        'weight': ''
      }
    },
    { 'step': 'profile', 'title': 'step.title.profile', 'completed': false, 'current': false }
  ];

  const initiateProfileSteps = () => {
    const steps = localStorage.getItem(`profileSteps_${userId}`);
    return steps ? JSON.parse(steps) : initialStateSteps;
  }

  const [profileSteps, setProfileSteps] = useState<IStep[]>(() => initiateProfileSteps());

  const [currentStepTitle, setCurrentStepTitle] = useState<Steps>('user');

  const completeStep = (step: Steps) => {
    setProfileSteps((prevState) => {
      const updatedSteps = prevState.map((s) =>
        s.step === step ? { ...s, completed: true } : s
      );
      console.log(updatedSteps);
      localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };

  const toggleStep = (step: Steps) => {
    setProfileSteps((prevState) => {
      const updatedSteps = prevState.map((s) =>
        s.step === step ? { ...s, current: true } : { ...s, current: false }
      );
      localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedSteps));
      return updatedSteps;
    });
  };


  const updateStepData = (newStepData: UserInfoValues | PetInfoValues, step: Steps) => {
    const updatedProfileSteps = profileSteps.map(s => s.step === step ? { ...s, step_data: newStepData } : s);
    setProfileSteps(updatedProfileSteps);
    localStorage.setItem(`profileSteps_${userId}`, JSON.stringify(updatedProfileSteps));
  };

  //Обновление currentStep
  useEffect(() => {
    const currentStep = profileSteps.find(step => step.current)?.step ?? 'user';
    if (currentStep !== currentStepTitle) {
      setCurrentStepTitle(currentStep);
    }
  }, [profileSteps, currentStepTitle]);

  //Инициализация profileSteps при подключении нового профиля
  useEffect(() => {
    if (userId) {
      const newProfileSteps = initiateProfileSteps();
      setProfileSteps(newProfileSteps);
    }
  }, [userId]);


  const value: IUserContext = {
    userId,
    isAuth,
    setIsAuth,
    isAuthLoading,
    logout,
    login,
    refreshToken,

    currentStepTitle,
    toggleStep,
    profileSteps,
    setProfileSteps,
    completeStep,
    updateStepData
  };

  if (isAuthLoading) return null;

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
