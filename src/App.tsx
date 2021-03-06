import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Auth/login';
import UserAlerts from './components/Layout/UserAlerts';
import { Home } from './components/Home/home';
import PrivateRoute from './routing/PrivateRoute';
import { UserContext } from './userContext';
import { Account } from './components/Account/account';
import  MiniDrawer  from './components/Layout/MiniNavigation';

import SeniorPrivateRoute from './routing/SeniorPrivateRoute';
import Navigation from './components/Layout/Navigation';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import ExpenseView from './components/Expense/ExpenseView';
import { Navbar } from './components/Layout/Navbar';
import ManagerOrSeniorPrivateRoute from './routing/ManagerOrSeniorPrivateRoute';
import ManagerSeniorExpense from './components/Home/Manager/ManagerSeniorExpense';
import ExpenseTable from './components/Expense/ExpenseTable';
import Profile from './components/Account/Profile';
import CompanyConfig from './components/Company/CompanyConfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      marginTop: '1.2%',
    },
    contentLoggedIn: {
      flexGrow: 1,
      marginTop: '1.2%',
      [theme.breakpoints.up('md')]: {
        marginLeft: '220px',
      },
    },
  })
);

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
    managerId: localStorage.getItem('managerId'),
    companyName: localStorage.getItem('companyName'),
    token: localStorage.getItem('token'),
    width: localStorage.getItem('width'),
    allUsers: [],
  });
  const classes = useStyles();
  const theme = useTheme();

  return (
    <div className={classes.root}>
      <main
        className={
          userAuthData.auth ? classes.contentLoggedIn : classes.content
        }
      >
        <UserContext.Provider value={{ userAuthData, setUserAuthData }}>
          <Navigation />
          {/* <MiniDrawer /> */}
          
          {/* <Navbar /> */}
          <UserAlerts />
          <Switch>
            {/* Public Routes */}
            <Route path='/' component={Login} exact />

            {/* Private Routes for Authenticated Users */}
            <PrivateRoute redirectPath='/' path='/home'>
              <Home />
            </PrivateRoute>
            <PrivateRoute redirectPath='/' path='/expense'>
              <ExpenseView />
            </PrivateRoute>
            <PrivateRoute redirectPath='/' path='/profile'>
              <Profile />
            </PrivateRoute>

            {/* Private Routes for only for UserType Senior Management */}
            <SeniorPrivateRoute redirectPath='/' path='/account'>
              <Account />
            </SeniorPrivateRoute>
            <SeniorPrivateRoute redirectPath='/' path='/company'>
              <CompanyConfig />
            </SeniorPrivateRoute>

            {/* Private Routes for only for UserType Senior Management and Manager */}
            <ManagerOrSeniorPrivateRoute redirectPath='/' path='/myexpenses'>
              <ManagerSeniorExpense />
            </ManagerOrSeniorPrivateRoute>
            <ManagerOrSeniorPrivateRoute redirectPath='/' path='/expenses'>
              <ExpenseTable />
            </ManagerOrSeniorPrivateRoute>
          </Switch>
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
