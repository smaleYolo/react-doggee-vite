import Cookies from 'js-cookie';
import { Locale } from './localesConfig.ts';

/**
 * Функция для получения текущей локали.
 * Проверяет, сохранена ли локаль в куках. Если нет, пытается определить локаль из настроек браузера.
 * @returns {Locale} - текущая локаль ('ru' или 'en').
 */
export const getLocale = (): Locale => {
  // Проверяем, есть ли сохраненная локаль в куках
  const savedLocale = Cookies.get('locale') as Locale;
  if (savedLocale) {
    return savedLocale;
  }
  // Определяем локаль из настроек браузера
  const browserLocale = navigator.language.split('-')[0] as Locale;
  return browserLocale === 'ru' ? 'ru' : 'en';
};