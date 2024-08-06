import Cookies from 'js-cookie';
import { Locale } from './IntlConfig.ts';

/**
 * Функция для получения текущей локали.
 * Проверяет, сохранена ли локаль в куках. Если нет, пытается определить локаль из настроек браузера.
 * @returns {Locale} - текущая локаль ('ru' или 'en').
 */
export const getLocale = (): Locale => {
  const savedLocale = Cookies.get('locale') as Locale;
  if (savedLocale) {
    return savedLocale;
  }

  const browserLocale = navigator.language.split('-')[0] as Locale;
  return browserLocale === 'ru' ? 'ru' : 'en';
};