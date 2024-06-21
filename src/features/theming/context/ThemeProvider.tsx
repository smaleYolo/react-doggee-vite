import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeContext, ThemeContextProps, ThemesType } from '../../theming';

import lightTheme from '@static/theme/light/light.module.css';
import darkTheme from '@static/theme/dark/dark.module.css';
import { getTheme } from '../helpers/getTheme';
import Cookies from 'js-cookie';


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