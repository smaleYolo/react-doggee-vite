import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { TestHeader } from '@common/TestComp/TestHeader/TestHeader';
import { ThemeToggle } from '@common/themeToggle/ThemeToggle';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { TestPage } from '@pages/Test/TestPage/TestPage';
import { ROUTES } from '@utils/constants';
import React, { useEffect } from 'react';

import 'react-toastify/dist/ReactToastify.css';
import { FillProfile } from '@pages/FillProfile/FillProfile.tsx';
import { useDate, useUser } from '@utils/contexts';
import { TestFooter } from '@common/TestComp/TestFooter/TestFooter.tsx';


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
      element={<TestPage />}
      path={ROUTES.TEST} />
    <Route
      element={<NotFoundPage />}
      path={ROUTES.ANY} />
  </Routes>
);

const App = () => {
  const { isAuth } = useUser();




  return (
    <BrowserRouter>
      <TestHeader />
      <ThemeToggle />
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <TestFooter/>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
