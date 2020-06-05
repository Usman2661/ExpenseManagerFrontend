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

// const sampleUserContext: UserContextInterface = {
//   name: 'Using React Context in a Typescript App',
//   auth: false,
//   userType: 'Staff',
// };

function App() {
  const [userAuthData, setUserAuthData] = useState({
    id: localStorage.getItem('id'),
    auth: localStorage.getItem('auth'),
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email'),
    userType: localStorage.getItem('userType'),
  });
  return (
    <main>
      <UserContext.Provider value={{ userAuthData, setUserAuthData }}>
        <Navbar></Navbar>
        <Switch>
          <PublicRoute redirectPath='/home' path='/'>
            <Login />
          </PublicRoute>
          <PublicRoute redirectPath='/home' path='/register'>
            <Register />
          </PublicRoute>

          {/* <Route path='/' component={Login} exact />
          <Route path='/register' component={Register} exact /> */}
          <Route path='/users' component={UserTest} exact />
          <PrivateRoute redirectPath='/' path='/home'>
            <Home />
          </PrivateRoute>
        </Switch>
      </UserContext.Provider>
    </main>
  );
}

export default App;
