import Cookies from 'js-cookie';
import { defaultTheme, ThemesType } from '@features/theming';

export const getTheme = (): ThemesType => {
  const savedTheme = Cookies.get('theme') as ThemesType;

  if (savedTheme) {
    return savedTheme;
  }

  return defaultTheme
};