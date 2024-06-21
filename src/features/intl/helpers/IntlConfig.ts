import EN from '@static/locales/en-US.json';
import RU from '@static/locales/ru.json';

// Тип для поддерживаемых локалей
export type Locale = 'en' | 'ru';

// Тип для сообщений (ключ-значение)
export type Messages = Record<string, string>;

// Объект с сообщениями для каждой локали
export const defaultMessages: Record<Locale, Messages> = {
  'en': EN,
  'ru': RU,
};
