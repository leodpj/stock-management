import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/auth';  // Importa a funçãoh';

const PrivateRoute = ({ component: Component, ...rest }) => {
  

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to={{ pathname: "/login", state: { from: props.location } }} />  // Redireciona para a tela de login se não autenticado
        )
      }
    />
  );
};

export default PrivateRoute;