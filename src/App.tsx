import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>Test Page</h1>} />
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  const [isAuth, setAuth] = React.useState(false);


  return (
    <BrowserRouter>
      {isAuth ? <MainRoutes /> : <AuthRoutes />}
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
