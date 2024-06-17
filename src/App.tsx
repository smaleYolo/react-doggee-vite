import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TestPage } from '@pages/Test/TestPage';
import Cookies from 'js-cookie';
import { AuthContext, useAuth } from '@utils/contexts/AuthContext/AuthContext.ts';


const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TestPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  const {isAuth, AuthHandler} = useAuth()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const authCookie = Cookies.get('access_token');
    const userIdCookie = Cookies.get('userId');
    const notUserDeviceCookie = Cookies.get('NotUserDevice');

    if (authCookie && notUserDeviceCookie) {
      const [notUserDeviceFlag, notUserDeviceUserId] = notUserDeviceCookie.split('_');

      if (notUserDeviceFlag === 'true' && notUserDeviceUserId === userIdCookie) {
        Cookies.remove('access_token');
        Cookies.remove('userId');
        Cookies.remove('NotUserDevice');
        AuthHandler(false);
      } else {
        Cookies.remove('NotUserDevice');
        AuthHandler(true);
      }
    } else if (authCookie) {
      AuthHandler(true);
    }

    setIsLoading(false);
  }, [AuthHandler]);

  if (isLoading) return null;

  return (
    <BrowserRouter>
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
