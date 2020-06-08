import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { UserContext } from '../userContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function Navbar(props: any) {
  const classes = useStyles();

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const logout = () => {
    localStorage.clear();
    setUserAuthData({
      id: '',
      auth: false,
      name: '',
      email: '',
      userType: '',
      token: '',
    });
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='primary'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Expense Manager
          </Typography>
          {userAuthData.userType === 'SeniorManagement' ? (
            <Button color='inherit'>Accounts Approval</Button>
          ) : null}
          {userAuthData.auth ? (
            <Button color='inherit' onClick={logout}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </div>
  );
}
