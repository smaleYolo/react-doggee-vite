import React from 'react';
import { useIntl } from '@features/intl';

export const unFlagStyles = { color: 'rgb(245, 198, 120)', fontWeight: 600 }
export const flagStyles = { color: 'rgb(147, 177, 255)', fontWeight: 600 }

interface IntlTextProps {
  path: string; // Путь к локализованному сообщению
  values?: Record<string, any>; // Объект для замены значений в сообщении
  children?: (message: React.ReactNode) => React.ReactNode; // Функция для рендеринга дочерних элементов
  ruleCheck?: boolean; // Дополнительный флаг, если требуется
}

// Компонент для отображения локализованных сообщений с поддержкой кастомных тегов
export const IntlText: React.FC<IntlTextProps> = ({ path, values, ruleCheck, children }) => {
  const { translateMessage } = useIntl(); // Хук для получения функции перевода сообщений

  // Получение локализованного сообщения по пути
  const rawMessage = translateMessage(path, values);

  // Обработка кастомных тегов <rule>
  // Регулярное выражение для поиска тегов <rule>
  const ruleRegex = /<rule>(.*?)<\/rule>/g;

  // Разбиваем сообщение на части, используя регулярное выражение
  // split разделяет строку на части, которые не содержат <rule> и </rule>
  // Каждый второй элемент массива будет содержимым тега <rule>
  const parts = rawMessage.split(ruleRegex).map((part, index) => {
    if (index % 2 === 0) {
      // Если индекс четный, это обычный текст
      return part;
    } 
      // Если индекс нечетный, это текст внутри тега <rule>
      return (
        <span
key={index}
style={ruleCheck ? flagStyles : unFlagStyles}>
          {part}
        </span>
      );
    
  });

  // Объединение частей сообщения
  const message = <>{parts}</>;

  if (typeof children === 'function') {
    // Если передана функция в children, используем ее для рендеринга
    return <>{children(message)}</>;
  }

  // Возвращаем обработанное сообщение
  return <>{message}</>;
};
