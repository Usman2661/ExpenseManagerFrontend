import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Navbar from './components/Navbar';
import { UserTest } from './components/UserTest';
import { Register } from './components/register';

function App() {
  return (
    <main>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/users' component={UserTest} exact />
        <Route path='/register' component={Register} />
      </Switch>
    </main>
  );
}

export default App;
