import React from 'react';
import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import NavBar from './containers/NavBar';
import LoginPage from './containers/Authentication/LoginPage';
import ProtectedRoute from './hoc/ProtectedRoute';
import Workspace from './containers/Workspace';
import AccessDenied from './componenets/AccessDenied';
import Home from './containers/MainScreen/MainScreen';
import { AuthProvider } from './containers/Authentication/contex';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
          <NavBar />
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <Redirect from="/f/root" to="/" />
            <ProtectedRoute path="/f/:folderId" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/q/:id" component={Workspace} />
            <Route path="/accessdenied" component={AccessDenied} />
          </Switch>
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
