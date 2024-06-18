import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { TestPage } from '@pages/Test/TestPage';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '@utils/contexts';
import { useIntl } from '@features/intl/hooks';

const AuthRoutes = () => (
  <Routes>
    <Route path="/auth" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="*" element={<Navigate to="/auth" />} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<TestPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

const App = () => {
  const { isAuth, logout } = useAuth();
  const { setLanguage } = useIntl();

  return (
    <BrowserRouter>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: 400,
        alignItems: 'center',
        margin: '0 auto'
      }}>
        <div>
          <button onClick={() => setLanguage('ru')}>Русский</button>
          <button onClick={() => setLanguage('en')}>English</button>
        </div>
        <div>
          <button onClick={logout}>Выйти</button>
        </div>
      </header>
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
