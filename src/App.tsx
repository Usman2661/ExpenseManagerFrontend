import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Auth/login';
import { Navbar } from './components/Layout/Navbar';
import Register from './components/Auth/register';
import { UserTest } from './components/UserTest';
import { Home } from './components/Home/home';
import PrivateRoute from './routing/PrivateRoute';
import { UserContext } from './userContext';
import PublicRoute from './routing/PublicRoute';
import { Account } from './components/Account/account';
import SeniorPrivateRoute from './routing/SeniorPrivateRoute';
import UpdateAccount from './components/Account/UpdateAccount';

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
    allUsers: [],
  });

  return (
    <main>
      <UserContext.Provider value={{ userAuthData, setUserAuthData }}>
        <Navbar></Navbar>
        <Switch>
          {/* 
          Public Routes */}
          <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} exact />

          {/* Private Routes for Authenticated Users */}
          <PrivateRoute redirectPath='/' path='/home'>
            <Home />
          </PrivateRoute>

          {/* Private Routes for only for UserType Senior Management */}
          <SeniorPrivateRoute redirectPath='/' path='/account'>
            <Account />
          </SeniorPrivateRoute>
          <SeniorPrivateRoute redirectPath='/' path='/accountupdate'>
            <UpdateAccount />
          </SeniorPrivateRoute>
        </Switch>
      </UserContext.Provider>
    </main>
  );
}

export default App;
