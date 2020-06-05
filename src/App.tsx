import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/login';
import Navbar from './components/Navbar';
import { Register } from './components/register';

function App() {
  return (
    <main>
      <Navbar></Navbar>
      <Switch>
        <Route path='/' component={Login} exact />
        <Route path='/register' component={Register} exact />
      </Switch>
    </main>
  );
}

export default App;
