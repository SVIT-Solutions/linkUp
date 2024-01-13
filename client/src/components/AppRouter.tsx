import React, { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { privateRoutes, publicRoutes } from 'router';

const AppRouter = () => {
  const authContext = useContext(AuthContext);

  return authContext?.isAuth ? (
    <Routes>
      {privateRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={<route.element />} />
      ))}
    </Routes>
  );
};

export default AppRouter;
