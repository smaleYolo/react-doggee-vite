import ReactDOM from 'react-dom/client';
import App from './App';

import { IntlProvider } from '@features/intl';
import { ThemeProvider } from '@features/theming/context/ThemeProvider';
import { CalendarProvider, DateProvider, StepsProvider, AuthProvider, DogsProvider } from '@utils/contexts';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <IntlProvider>
      <AuthProvider>
        <DogsProvider>
          <StepsProvider>
            <CalendarProvider>
              <DateProvider>
                <App />
              </DateProvider>
            </CalendarProvider>
          </StepsProvider>
        </DogsProvider>
      </AuthProvider>
    </IntlProvider>
  </ThemeProvider>
);