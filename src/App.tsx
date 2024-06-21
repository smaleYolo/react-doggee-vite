import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';

import { TestPage } from '@pages/Test/TestPage/TestPage.tsx';
import { TestHeader } from '@pages/Test/TestHeader/TestHeader.tsx';
import { ThemeToggle } from '@common/themeToggle/ThemeToggle.tsx';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from '@utils/contexts';

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
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <TestHeader />
      <ThemeToggle/>
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
