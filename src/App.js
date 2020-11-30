import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import NavBar from './containers/NavBar';
import LoginPage from './containers/Authentication/LoginPage';
import ProtectedRoute from './hoc/ProtectedRoute';
import Workspace from './containers/Workspace';
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
            <ProtectedRoute path="/f/:folderId" exact component={Home} />
            <Route path="/login" component={LoginPage} />
            <ProtectedRoute path="/q/:id" component={Workspace} />
          </Switch>
        </SnackbarProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
