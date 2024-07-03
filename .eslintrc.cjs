module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json']
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'simple-import-sort'
  ],
  rules: {
    // Отключает правило, запрещающее затенение переменных
    // Пример: позволяет объявлять переменные с одинаковыми именами в разных областях видимости
    // Без отключения этого правила, следующая конструкция вызовет ошибку
    // function example() {
    //   const a = 1;
    //   if (true) {
    //     const a = 2; // Ошибка: 'a' is already declared in the upper scope.
    //   }
    // }
    '@typescript-eslint/no-shadow': 0,

    // Отключает правило, запрещающее неиспользуемые переменные
    // Пример: позволяет объявлять переменные, которые не используются
    // Без отключения этого правила, следующая конструкция вызовет ошибку
    // const unusedVar = 'I am not used'; // Ошибка: 'unusedVar' is assigned a value but never used.
    '@typescript-eslint/no-unused-vars': 'off',

    // Отключает правило, требующее возвращать значение во всех ветках функции
    // Пример: позволяет иметь ветки без явного возвращения значения
    // function example(condition) {
    //   if (condition) {
    //     return true;
    //   }
    //   // Нет return во второй ветке
    // }
    'consistent-return': 0,

    // Требует определять компоненты как стрелочные функции
    // Пример:
    // Без этого правила можно определить компоненты как функции:
    // function MyComponent() {
    //   return <div>Hello</div>;
    // }
    // С этим правилом компоненты должны быть стрелочными функциями:
    // const MyComponent = () => {
    //   return <div>Hello</div>;
    // };
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],

    // Отключает правило, предпочитающее экспорт по умолчанию
    // Пример:
    // export default function MyComponent() {} // Рекомендуется, но не обязательно
    'import/prefer-default-export': 0,

    // Отключает правило, запрещающее распространение пропсов
    // Пример:
    // Без этого правила следующая конструкция вызовет ошибку
    // <MyComponent {...props} /> // Ошибка: JSX props should not be spread
    'react/jsx-props-no-spreading': 0,

    // Отключает правило, требующее указания defaultProps для всех props
    // Пример:
    // MyComponent.defaultProps = { propName: 'default value' }; // Рекомендуется, но не обязательно
    'react/require-default-props': 0,

    // Отключает правило, требующее указание типа для кнопок
    // Пример:
    // <button type="button">Click me</button> // Рекомендуется, но не обязательно
    'react/button-has-type': 0,

    // Разрешает использование вложенных компонентов в качестве пропсов
    // Пример:
    // function ParentComponent() {
    //   return <ChildComponent render={() => <NestedComponent />} />;
    // }
    'react/no-unstable-nested-components': [2, { allowAsProps: true }],

    // Отключает правило, запрещающее использование индексов массива в качестве ключей
    // Пример:
    // items.map((item, index) => <Component key={index} />); // Разрешено
    'react/no-array-index-key': 0,

    // Отключает правило, требующее использование методов класса
    // Пример:
    // class MyClass {
    //   myMethod() {
    //     // some code
    //   }
    // }
    'class-methods-use-this': 0,

    // Отключает правило, запрещающее переопределение параметров функции
    // Пример:
    // function mutateParam(param) {
    //   param = 'new value'; // Разрешено
    // }
    'no-param-reassign': 0,

    // Отключает правило, требующее определенного порядка импортов
    // Пример:
    // import A from 'a';
    // import B from 'b';
    // Без этого правила ESLint может требовать определенного порядка импортов
    'import/order': 0,

    // Предупреждение при нарушении правил сортировки экспортов
    // Пример:
    // export { b, a }; // Будет выдано предупреждение и предложена сортировка: export { a, b };
    'simple-import-sort/exports': 1,

    // Предупреждение при нарушении правил сортировки импортов
    // Пример:
    // import B from 'b';
    // import A from 'a';
    // Группы импортов должны следовать в порядке: внешние, алиасы, системные и локальные
    'simple-import-sort/imports': [
      1,
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^@'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$']
        ]
      }
    ],

    // Отключает правило, требующее определенного стиля тела стрелочных функций
    // Пример:
    // const func = () => {
    //   return 'value'; // Разрешено
    // };
    'arrow-body-style': 'off',

    // Отключает правило, требующее наличия обработчиков событий клавиатуры для элементов с click-событиями
    // Пример:
    // <div onClick={handleClick}></div> // Разрешено
    'jsx-a11y/click-events-have-key-events': 'off',

    // Отключает правило, запрещающее интерактивные элементы без явного назначения ролей
    // Пример:
    // <div onClick={handleClick}></div> // Разрешено
    'jsx-a11y/no-static-element-interactions': 'off',

    // Отключает правило, требующее наличия связанного контрола для label
    // Пример:
    // <label>Label without control</label> // Разрешено
    'jsx-a11y/label-has-associated-control': 'off',

    // Отключает правило, требующее наличие React в области видимости
    // Пример:
    // import React from 'react'; // Не обязательно в новых версиях React
    'react/react-in-jsx-scope': 'off',








    // Добавленные правила


    // Предотвращает использование промисов в местах, где ожидаются только синхронные функции
    // Пример:
    // Ошибка: передача промиса в onClick
    // <button onClick={async () => { await fetchData(); }}>Click me</button>;
    // Правильно: обернуть в синхронную функцию
    // <button onClick={() => { fetchData().catch(console.error); }}>Click me</button>;
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false
      }
    ],

    // Отключает проверку аргументов на безопасность типов
    // Пример:
    // Отключено, поэтому следующий код допустим
    // function log(value: any) {
    //   console.log(value);
    // }
    // log(unsafeValue);
    '@typescript-eslint/no-unsafe-argument': 0,

    // Отключает проверку на плавающие промисы (промисы без обработки ошибок)
    // Пример:
    // Отключено, поэтому следующий код допустим
    // async function fetchData() {
    //   // fetch API data
    // }
    // fetchData(); // Нет обработки ошибок
    '@typescript-eslint/no-floating-promises': 0,

    // Отключает проверку использования подчеркивания в начале и конце идентификаторов
    // Пример:
    // Отключено, поэтому следующий код допустим
    // const _privateVariable = 'value';
    'no-underscore-dangle': 0,

    // Отключает правило exhaustivness deps для хуков
    // Пример:
    // Отключено, поэтому следующий код допустим
    // useEffect(() => {
    //   fetchData();
    // }, []); // Нет указания зависимостей
    'react-hooks/exhaustive-deps': 0,

    // Отключает проверку небезопасных вызовов типов
    // Пример:
    // Отключено, поэтому следующий код допустим
    // (someAnyValue as any).unsafeMethod();
    '@typescript-eslint/no-unsafe-call': 0,

    // Задает первую строку props для JSX в многолинейных компонентах
    // Пример:
    // Многолинейный компонент
    // <Component
    //   firstProp="value"
    //   secondProp="value"
    // />
    'react/jsx-first-prop-new-line': [1, 'multiline'],

    // Задает максимум строк для props в JSX
    // Пример:
    // Максимум один пропс на строку
    // <Component
    //   firstProp="value"
    //   secondProp="value"
    // />
    'react/jsx-max-props-per-line': [
      1,
      {
        maximum: 1
      }
    ],

    // Сортировка props в JSX компонентах
    // Пример:
    // Правильно: пропсы отсортированы
    // <Component
    //   callbackProp={() => {}}
    //   firstProp="value"
    //   secondProp="value"
    // />
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: true,
        multiline: 'last',
        ignoreCase: true,
        reservedFirst: true
      }
    ],

    // Обязательное использование импорта типов
    // Пример:
    // Правильно: использование type-imports
    // import type { MyType } from './types';
    '@typescript-eslint/consistent-type-imports': [
      'error',
      { prefer: 'type-imports', disallowTypeAnnotations: false }
    ],

    // Отключает проверку расширений в импортах
    // Пример:
    // Отключено, поэтому следующий код допустим
    // import MyComponent from './MyComponent';
    'import/extensions': 0,

    // Отключает проверку зависимостей
    // Пример:
    // Отключено, поэтому следующий код допустим
    // import { somePackage } from 'some-external-package';
    'import/no-extraneous-dependencies': 0,

    // Отключает проверку на экспорт по умолчанию
    // Пример:
    // export { myFunction }; // Разрешено
    'import/export': 0,

    // Порядок импортов
    // Пример:
    // import React from 'react';
    // import { useState } from 'react';
    // import MyComponent from '~/components/MyComponent';
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        pathGroups: [
          {
            pattern: '~pages/*',
            group: 'parent'
          },
          {
            pattern: '~*',
            group: 'internal'
          },
          {
            pattern: '~*/**',
            group: 'internal'
          },
          {
            pattern: './**',
            group: 'index'
          }
        ],
        alphabetize: {
          order: 'asc'
        }
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json']
      }
    }
  ]
};
