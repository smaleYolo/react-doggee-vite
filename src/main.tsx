import { IntlProvider } from '@features/intl';
import { ThemeProvider } from '@features/theming/context/ThemeProvider';
import { UserProvider } from '@utils/contexts';
import { DateProvider } from '@features/calendar';
import ReactDOM from 'react-dom/client';

import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <IntlProvider>
      <UserProvider>
        <DateProvider>
          <App />
        </DateProvider>
      </UserProvider>
    </IntlProvider>
  </ThemeProvider>
);
