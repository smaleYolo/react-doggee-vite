import React from 'react';

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { ThemeToggle } from '@common/ThemeToggle/ThemeToggle.tsx';
import { LanguageToggle } from '@common/LanguageToggle/LanguageToggle.tsx';
import { ROUTES } from '@utils/constants';
import { FillProfile } from '@pages/FillProfile/FillProfile.tsx';
import { useAuth } from '@utils/contexts';
import { Exit } from '@common/Exit/Exit.tsx';
import 'react-toastify/dist/ReactToastify.css';


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
      element={<FillProfile />}
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
      <ThemeToggle />
      <Exit/>
      <LanguageToggle/>
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
