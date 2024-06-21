import { useContext } from 'react';
import { ThemeContext } from '@features/theming/context/ThemeContext.ts';

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if(!theme) {
    throw new Error('useTheme must be used within ThemeProvider');
  }

  return theme
}