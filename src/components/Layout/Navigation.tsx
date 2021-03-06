import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import { observer } from 'mobx-react-lite';

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
import UserStore from '../../MobX/store/UserStore';
import ExpenseStore from '../../MobX/store/ExpenseStore';


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
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
);

interface Props {
  window?: () => Window;
}

function Navigation(props: Props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const history = useHistory();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const userStore = useContext(UserStore);
  const { userProfile, userProfileLoaded, getUserProfile , clearUserProfile } = userStore;

  const expenseStore = useContext(ExpenseStore);
  const { clearSeniorExpenses } = expenseStore;

  if (userAuthData.auth) {
    if (!userProfileLoaded) {
      getUserProfile();
    }
  }

  const renderColor = () => {
    const color = userAuthData.auth
      ? userProfile?.Company?.CompanyConfig?.appBarColor?.toString() ||
        '#3f51b5'
      : '#3f51b5';

    return color;
  };

  const logout = async () => {
    localStorage.clear();

    setUserAuthData({
      id: '',
      auth: false,
      name: '',
      email: '',
      userType: '',
      token: '',
    });

    handleClose();

    await clearSeniorExpenses();
    await clearUserProfile();
    history.push('/');
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const drawer = (
    <div>
      <div />

      <div>
        {/* <div style={{ display: 'flex', marginLeft: '8%', marginTop: '8%' }}>
          <Button color='inherit' component={Link} to='/profile'>
            <ListItemAvatar>
              <Avatar className={classes.orange}>
                {(userAuthData.name || '?').charAt(0)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={userAuthData.name}
              secondary={userAuthData.userType}
            />
          </Button>
        </div> */}

        <div
          className='ProfileSettings'
          style={{
            marginTop: '3%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            margin: '0',
            wordSpacing: 'none',
          }}
          // autoFocus
          // onClick={handleClick}
        >
          <Avatar
            className={classes.purple}
            style={{ height: '70px', width: '70px' }}
          >
            <h1 style={{ fontSize: '40' }}>
              {' '}
              {(userProfile.name || '?').charAt(0)}
            </h1>
          </Avatar>
          <Typography style={{ marginTop: 'auto' }} variant='h4'>
            {userProfile.name}
          </Typography>

          <Typography
            variant='body1'
            style={{
              marginTop: 'auto',
              fontWeight: 'bold',
              color: '#7B7D7D',
            }}
          >
            {userProfile.jobTitle}
          </Typography>
          <Typography
            variant='body2'
            style={{
              marginTop: 'auto',
              color: '#7B7D7D',
              fontStyle: 'italic',
            }}
          >
            {userProfile.userType}
          </Typography>
        </div>
      </div>
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
        style={{
          // backgroundColor:
          //   userProfile?.Company?.CompanyConfig?.appBarColor?.toString() ||
          //   'primary',
          backgroundColor: renderColor(),
        }}
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
          {userAuthData.auth ? (
            <img
              src={userProfile?.Company?.CompanyConfig?.logo ? userProfile?.Company?.CompanyConfig?.logo.toString() : undefined }
              height='40px'
            />
          ) : null}
          <Typography variant='h6' style={{ flex: 1 }}>
            {userAuthData.auth && userAuthData.userType !== 'Admin'
              ? userProfile?.Company?.name
              : 'Expense Manager'}
          </Typography>

          {userAuthData.auth ? (
            <Button color='inherit' onClick={handleClick}>
              <div style={{ display: 'flex' }}>
                <Avatar className={classes.orange}>
                  {userProfile.name.charAt(0)}
                </Avatar>
                <span style={{ marginTop: '5%' }}>{userProfile.name}</span>
              </div>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
      {userAuthData.auth ? (
        <nav className={classes.drawer} aria-label='mailbox folders'>
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
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to='/profile'>
          Profile
        </MenuItem>
        {userAuthData.userType === 'SeniorManagement' ? (
          <MenuItem component={Link} to='/company'>
            Company Details
          </MenuItem>
        ) : null}
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
      </main>
    </div>
  );
}

export default observer(Navigation);
