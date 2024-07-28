import { IntlProvider } from '@features/intl';
import { ThemeProvider } from '@features/theming/context/ThemeProvider';
import { CalendarProvider, DateProvider, UserProvider } from '@utils/contexts';
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
        <CalendarProvider>
          <DateProvider>
            <App />
          </DateProvider>
        </CalendarProvider>
      </UserProvider>
    </IntlProvider>
  </ThemeProvider>
);
