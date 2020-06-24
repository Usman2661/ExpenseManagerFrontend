import React, { useContext, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Company from '../../Company/Company';
import Users from '../../User/Users';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import UserStore from '../../../MobX/store/UserStore';
import CompanyStore from '../../../MobX/store/CompanyStore';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      style={{ color: '#e5e7e9', backgroundColor: '#e5e7e9' }}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdminHome() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  // const userStore = useContext(UserStore);
  // const { getUsers, infoUser } = userStore;

  // const companyStore = useContext(CompanyStore);
  // const { getCompanies, infoCompany } = companyStore;

  // useEffect(() => {
  //   getUsers();
  //   getCompanies();
  // }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' color='default'>
        <Grid
          className='tabsContainer'
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={{ margin: 0, width: '100%' }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              aria-label='full width tabs example'
            >
              <Tab label='Companies' {...a11yProps(0)} />
              {/* <Badge
                badgeContent={infoCompany.total}
                color='primary'
                style={{ marginTop: '6%', marginLeft: '-15%' }}
              ></Badge> */}
              <Tab label='Users' {...a11yProps(1)} />
              {/* <Badge
                badgeContent={infoUser.total}
                color='primary'
                style={{ marginTop: '6%', marginLeft: '-15%' }}
              ></Badge> */}
            </Tabs>
          </Grid>
        </Grid>
      </AppBar>

      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        style={{ backgroundColor: '#e5e7e9' }}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Company />
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Users />
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}
