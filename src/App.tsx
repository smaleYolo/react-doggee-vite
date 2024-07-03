import { ThemeToggle } from '@common/themeToggle/ThemeToggle';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { TestHeader } from '@common/TestComp/TestHeader/TestHeader';
import { TestPage } from '@pages/Test/TestPage/TestPage';
import { useAuth } from '@utils/contexts';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const AuthRoutes = () => (
  <Routes>
    <Route
      element={<LoginPage />}
      path="/auth" />
    <Route
      element={<RegisterPage />}
      path="/register" />
    <Route
      element={<Navigate to="/auth" />}
      path="*" />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route
      element={<TestPage />}
      path="/" />
    <Route
      element={<NotFoundPage />}
      path="*" />
  </Routes>
);

const App = () => {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      <TestHeader />
      <ThemeToggle />
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
