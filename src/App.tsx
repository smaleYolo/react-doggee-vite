import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '@utils/contexts';
import { ROUTES } from '@utils/constants';

import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { TestPage } from '@pages/Test/TestPage/TestPage';

import { ThemeToggle } from '@common/themeToggle/ThemeToggle';
import { TestHeader } from '@common/TestComp/TestHeader/TestHeader';


const AuthRoutes = () => (
  <Routes>
    <Route
      element={<LoginPage />}
      path={ROUTES.AUTH} />
    <Route
      element={<RegisterPage />}
      path={ROUTES.REGISTER} />
    <Route
      element={<Navigate to={ROUTES.AUTH} />}
      path={ROUTES.ANY} />
  </Routes>
);

const MainRoutes = () => (
  <Routes>
    <Route
      element={<TestPage />}
      path={ROUTES.MAIN} />
    <Route
      element={<NotFoundPage />}
      path={ROUTES.ANY} />
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
