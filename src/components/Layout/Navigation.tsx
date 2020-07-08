import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { UserContext } from '../../userContext';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MenuIcon from '@material-ui/icons/Menu';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';

import PeopleIcon from '@material-ui/icons/People';

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up('md')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    toolbarRoot: {
      flexGrow: 1,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

interface Props {
  window?: () => Window;
}

export default function Navigation(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

    history.push('/');
  };

  const drawer = (
    <div>
      <div />
      {/* <Avatar className={classes.orange} style={{ alignItems: 'center' }}>
        {userAuthData.name.charAt(0)}
      </Avatar> */}
      <h2 style={{ textAlign: 'center' }}> Hello {userAuthData.name} </h2>
      <Divider />

      <List component='nav' aria-label='main mailbox folders'>
        <ListItem button component={Link} to='/home'>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        {userAuthData.userType === 'SeniorManagement' ? (
          <div>
            <ListItem button component={Link} to='/account'>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary='Users' />
            </ListItem>
            {/* <ListItem button component={Link} to='/expenses'>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='All User Expenses' />
            </ListItem> */}
            <ListItem button component={Link} to='/myexpenses'>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='My Expenses' />
            </ListItem>
          </div>
        ) : null}
        {userAuthData.userType === 'Manager' ? (
          <div>
            {/* <ListItem button component={Link} to='/expenses'>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='All User Expenses' />
            </ListItem> */}

            <ListItem button component={Link} to='/myexpenses'>
              <ListItemIcon>
                <MonetizationOnIcon />
              </ListItemIcon>
              <ListItemText primary='My Expenses' />
            </ListItem>
          </div>
        ) : null}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position='fixed'
        className={userAuthData.auth ? classes.appBar : undefined}
      >
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' style={{ flex: 1 }}>
            Expense Manager
          </Typography>

          {userAuthData.auth ? (
            <Button color='inherit' onClick={logout}>
              Logout
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {userAuthData.auth ? (
        <nav className={classes.drawer} aria-label='mailbox folders'>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden mdUp implementation='css'>
            <Drawer
              container={container}
              variant='temporary'
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden smDown implementation='css'>
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant='permanent'
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
      ) : null}

      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
      </main>
    </div>
  );
}
