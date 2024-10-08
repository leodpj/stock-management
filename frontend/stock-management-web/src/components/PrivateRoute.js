//import React from 'react';
//import { Navigate } from 'react-router-dom';

//const PrivateRoute = ({ component: Component }) => {
//  const isAuthenticated = !!localStorage.getItem('access_token');  // Verifica se o usuário está autenticado

//  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
//};

//export default PrivateRoute;


import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem('access_token'); // Verifica se o token de acesso existe

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />  // Redireciona para a tela de login se não autenticado
        )
      }
    />
  );
};

export default PrivateRoute;