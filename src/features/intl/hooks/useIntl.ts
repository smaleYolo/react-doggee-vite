import { useContext } from 'react';
import { IntlContext } from '@features/intl';

export const useIntl = () => {
  const intl = useContext(IntlContext);

  if (!intl) {
    throw new Error('useIntl must be used within an IntlProvider');
  }

  const translateMessage = (path: string, values?: Record<string, string | number | boolean>): string => {
    // Получаем сообщение по заданному пути из контекста
    // `intl.messages` - объект, содержащий все локализованные строки
    // `path` - ключ, по которому извлекается конкретное сообщение
    let message = intl.messages[path];

    // Если сообщение не найдено в `intl.messages`, возвращаем сам путь `path`
    // Это позволяет легко выявлять отсутствующие ключи в локализационных данных
    if (!message) {
      return path;
    }

    // Если передан объект `values` для подстановки значений в сообщение
    if (values) {
      // Перебираем все ключи в объекте `values`
      Object.keys(values).forEach((key) => {
        // Создаем регулярное выражение для поиска ключа в формате {key}
        // Регулярное выражение используется для замены всех вхождений {key} в сообщении
        const regex = new RegExp(`{${key}}`, 'g');
        // Заменяем все вхождения ключа на соответствующее значение из `values`
        // Метод `replace` ищет все вхождения, соответствующие регулярному выражению, и заменяет их на значение
        // Значение приводится к строке с помощью `String(values[key])` для обеспечения совместимости типов
        message = message.replace(regex, String(values[key]));
      });
    }

    // Возвращаем переведенное сообщение с подставленными значениями
    return message;
  };

  return { ...intl, translateMessage };
};
