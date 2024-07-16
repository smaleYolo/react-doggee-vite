import darkTheme from '@static/theme/dark/dark.module.css';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { ThemeContext, type ThemeContextProps, type ThemesType } from "..";
import { getTheme } from '../helpers/getTheme';

import lightTheme from '@static/theme/light/light.module.css';


export interface ThemeProviderProps {
  children?: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemesType>(() => getTheme());

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const savedTheme = Cookies.get('theme');

    if (savedTheme !== currentTheme) {
      Cookies.set('theme', currentTheme);
    }
  }, [currentTheme]);


  const value: ThemeContextProps = useMemo(() => ({
    theme: currentTheme,
    toggleTheme,
  }), [currentTheme, toggleTheme]);


  return (
    <ThemeContext.Provider value={value}>
      <div className={currentTheme === 'light' ? lightTheme.container : darkTheme.container}>
        {children}
      </div>
    </ThemeContext.Provider>
);
};