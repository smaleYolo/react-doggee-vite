import ReactDOM from 'react-dom/client';
import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

import { AuthProvider } from '@utils/contexts';
import { IntlProvider } from '@features/intl';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <IntlProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </IntlProvider>
);
