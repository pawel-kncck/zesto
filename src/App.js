import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import NavBar from './containers/NavBar';
import LoginPage from './containers/Authentication/LoginPage';
import SignUpPage from './containers/Authentication/SignUpPage';
import ProtectedRoute from './hoc/ProtectedRoute';
import Workspace from './containers/Workspace';
import Home from './containers/FileList'
import { AuthProvider } from './containers/Authentication/contex';


function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <ProtectedRoute path='/q/:id' component={Workspace} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
