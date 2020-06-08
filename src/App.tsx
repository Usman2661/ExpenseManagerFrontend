import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/login';
import { Navbar } from './components/Navbar';
import { Register } from './components/register';
import { UserTest } from './components/UserTest';
import { Home } from './components/home';
import PrivateRoute from './routing/PrivateRoute';
import { UserContext } from './userContext';
import PublicRoute from './routing/PublicRoute';

function App() {
  var auth;
  const authStore = localStorage.getItem('auth');
  if (authStore) {
    auth = true;
  } else {
    auth = false;
  }
  const [userAuthData, setUserAuthData] = useState({
    id: localStorage.getItem('id'),
    name: localStorage.getItem('name'),
    auth: auth,
    email: localStorage.getItem('email'),
    userType: localStorage.getItem('userType'),
    token: localStorage.getItem('token'),
  });

  return (
    <main>
      <UserContext.Provider value={{ userAuthData, setUserAuthData }}>
        <Navbar></Navbar>
        <Switch>
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <PrivateRoute redirectPath='/' path='/home'>
            <Home />
          </PrivateRoute>
        </Switch>
      </UserContext.Provider>
    </main>
  );
}

export default App;
