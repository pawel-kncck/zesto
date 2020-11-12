import React from 'react';
import { Route } from 'react-router-dom';
import LoginPage from '../containers/Authentication/LoginPage';

const ProtectedRoute = ({ component: Component, user, ...rest}) => {
    return (
        <Route {...rest} render={
            props => {
                if (user) {
                    return <Component {...rest} {...props} />
                } else {
                    return <LoginPage />
                }
            }
        } />
    );
}
 
export default ProtectedRoute;