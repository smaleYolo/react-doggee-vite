import ReactDOM from 'react-dom/client';
import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

import { AuthProvider } from '@utils/contexts';
import { IntlProvider } from '@features/intl';

import EN from 'src/static/locales/en-US.json';
import RU from 'src/static/locales/ru.json';

const initialLocale = 'ru';
const defaultMessages: Record<string, Record<string, string>> = {
  'en': EN,
  'ru': RU
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <IntlProvider initialLocale={initialLocale} defaultMessages={defaultMessages}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </IntlProvider>
);
