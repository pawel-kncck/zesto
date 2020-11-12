import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import NavBar from './containers/NavBar';
import LoginPage from './containers/Authentication/LoginPage';
import SignUpPage from './containers/Authentication/SignUpPage';
import ProtectedRoute from './hoc/ProtectedRoute';
import Workspace from './containers/Workspace';


function App() {
  const [user, setUser] = useState(true);

  const toggleUser = () => {
    setUser(!user);
  }
  
  return (
    <BrowserRouter>
      <NavBar user={user} toggleUser={toggleUser}/>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={SignUpPage} />
        <ProtectedRoute path='/q/:id' user={user} component={Workspace} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
