import { createContext } from 'react';
import { ThemesType } from '@features/theming/helpers/ThemeConfig.ts';

export interface ThemeContextProps {
  theme: ThemesType,
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);