import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '@utils/api';
import { UserContext } from '@utils/contexts';

export type Steps = 'user' | 'pets' | 'profile'

export interface Step {
  step: Steps;
  title: string;
  completed: boolean;
}

export interface UserContextProps {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  isLoading: boolean;
  logout: () => void;
  login: (access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean | undefined) => void;
  refreshToken: () => Promise<void>;
  currentStep: Steps;
  toggleStep: (step: Steps) => void;
  getUserId: () => string | undefined;
  profileSteps: Step[];
  completeStep: (step: Steps) => void;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}


// TODO: Разбить функционал на хуки (хук для работы с аутентификацией (useAuth)) и хук для работы с шагами профиля (useProfileSteps)
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getUserId = useCallback(() => {
    return Cookies.get('userId');
  }, []);

  const getInitialSteps = () => {
    const steps = localStorage.getItem(`profileSteps_${getUserId()}`);
    return steps ? JSON.parse(steps) : [
      { 'step': 'user', 'title': "step.title.user", 'completed': false },
      { 'step': 'pets', 'title': "step.title.pets", 'completed': false },
      { 'step': 'profile', 'title': "step.title.profile", 'completed': false }
    ];
  };

  const [profileSteps, setProfileSteps] = useState<Step[]>(() => getInitialSteps());

  const completeStep = (step: Steps) => {
    setProfileSteps((prevState) =>
      prevState.map((s) =>
        s.step === step ? { ...s, completed: true } : s
      )
    );
  };

  const getInitialStep = useCallback((): Steps => {
    const step = Cookies.get(`profile_step_${getUserId()}`) as Steps | undefined;
    return step ?? 'user';
  }, [getUserId]);

  const [currentStep, setCurrentStep] = useState<Steps>(getInitialStep);

  const toggleStep = useCallback((step: Steps) => {
    setCurrentStep(step);
    Cookies.set(`profile_step_${getUserId()}`, step);
  }, [getUserId]);

  const logout = useCallback(() => {
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');
    Cookies.remove('userId');
    Cookies.remove('NotUserDevice');
    setIsAuth(false);
  }, []);

  const login = useCallback((access_token: string, refresh_token: string, userId: number, isNotUserDevice?: boolean) => {
    Cookies.set('access_token', access_token);
    Cookies.set('refresh_token', refresh_token);
    Cookies.set('userId', String(userId));
    if (isNotUserDevice) {
      Cookies.set('NotUserDevice', `true_${userId}`);
    } else {
      Cookies.remove('NotUserDevice');
    }
    setIsAuth(true);

    const step = Cookies.get(`profile_step_${userId}`) as Steps | undefined;
    if (step) {
      setCurrentStep(step);
    } else {
      setCurrentStep('user');
    }

    // Сбросить состояние шагов и установить новое значение
    const initialSteps = getInitialSteps();
    setProfileSteps(initialSteps);
  }, [getInitialSteps]);

  const refreshToken = useCallback(async () => {
    const refresh_token = Cookies.get('refresh_token');
    if (!refresh_token) {
      logout();
      return;
    }
    try {
      const response = await api.post<RefreshResponse, {
        refresh_token: string
      }>('/auth/refresh-token', { refresh_token });
      const { access_token, refresh_token: new_refresh_token } = response;
      Cookies.set('access_token', access_token);
      Cookies.set('refresh_token', new_refresh_token);
      setIsAuth(true);
    } catch (error) {
      logout();
    }
  }, [logout]);

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
    setIsLoading(false);
  }, [logout, refreshToken]);

  useEffect(() => {
    if (getUserId()) {
      localStorage.setItem(`profileSteps_${getUserId()}`, JSON.stringify(profileSteps));
    }
  }, [profileSteps, getUserId]);

  const value: UserContextProps = {
    isAuth,
    setIsAuth,
    isLoading,
    logout,
    login,
    refreshToken,
    currentStep,
    toggleStep,
    getUserId,
    profileSteps,
    completeStep
  }

  if (isLoading) return null;


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
