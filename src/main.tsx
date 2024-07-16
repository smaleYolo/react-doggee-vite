import ReactDOM from 'react-dom/client';
import App from './App';

import { IntlProvider } from '@features/intl';
import { ThemeProvider } from '@features/theming/context/ThemeProvider';
import { AuthProvider } from '@utils/contexts';
import { DateProvider } from '@utils/contexts';
import { ProfileStepsProvider } from '@contexts/ProfileSteps';


import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ThemeProvider>
    <IntlProvider>
      <AuthProvider>
        <DateProvider>
        <ProfileStepsProvider>
          <App />
        </ProfileStepsProvider>
        </DateProvider>
      </AuthProvider>
    </IntlProvider>
  </ThemeProvider>
);
