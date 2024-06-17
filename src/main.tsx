import ReactDOM from 'react-dom/client';

import App from './App';

import './static/css/fonts.css';
import './static/css/global.css';
import './index.css';

import { AuthProvider } from '@utils/contexts/AuthContext/AuthProvider.tsx';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
