import React, { useState } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { Login } from './components/Auth/login';
import UserAlerts from './components/Layout/UserAlerts';
import { Home } from './components/Home/home';
import PrivateRoute from './routing/PrivateRoute';
import { UserContext } from './userContext';
import { Account } from './components/Account/account';
import SeniorPrivateRoute from './routing/SeniorPrivateRoute';
import Navigation from './components/Layout/Navigation';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      // backgroundColor: '#e5e7e9',
      // color: '#e5e7e9',
    },

    content: {
      flexGrow: 1,
      marginTop: '1.2%',
      // padding: theme.spacing(3),
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
          {/* <Navbar></Navbar> */}
          <Navigation />
          <UserAlerts />
          <Switch>
            {/* 
          Public Routes */}
            <Route path='/' component={Login} exact />
            {/* <Route path='/register' component={Register} exact /> */}

            {/* Private Routes for Authenticated Users */}
            <PrivateRoute redirectPath='/' path='/home'>
              <Home />
            </PrivateRoute>

            {/* Private Routes for only for UserType Senior Management */}
            <SeniorPrivateRoute redirectPath='/' path='/account'>
              <Account />
            </SeniorPrivateRoute>
          </Switch>
        </UserContext.Provider>
      </main>
    </div>
  );
}

export default App;
