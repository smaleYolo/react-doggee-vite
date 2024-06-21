import { defaultMessages, Locale, Messages } from '@features/intl/helpers/IntlConfig.ts';

/**
 * Функция для получения сообщений на текущем языке.
 * @param {Locale} locale - текущая локаль.
 * @returns {Messages} - объект сообщений для текущей локали.
 */
export const getMessages = (locale: Locale): Messages => {
  return defaultMessages[locale];
};