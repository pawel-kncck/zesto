import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../containers/Authentication/LoginPage';
import LoadingScreen from '../componenets/LoadingScreen';
import { AuthContext } from '../containers/Authentication/contex';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user, loading } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) {
          return <LoadingScreen />;
        } else if (user) {
          return <Component {...rest} {...props} />;
        } else {
          return <LoginPage />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
