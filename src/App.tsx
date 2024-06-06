import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '@pages/LoginPage/LoginPage';
import { NotFoundPage } from '@pages/NotFoundPage/NotFoundPage';
import { RegisterPage } from '@pages/RegisterPage/RegisterPage';


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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  const [isAuth, setAuth] = React.useState(false);

  return <BrowserRouter>{isAuth ? <MainRoutes /> : <AuthRoutes />}</BrowserRouter>;
};

export default App;
