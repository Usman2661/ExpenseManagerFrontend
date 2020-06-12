import React, { Component, useContext } from 'react';
import { UserContext } from '../../userContext';
import { StatCards } from './Staff/StatCards';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';

export function Home() {
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const [value, setValue] = React.useState(2);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      {userAuthData.userType === 'Staff' ? <StatCards /> : null}

      {/* 
      <Paper square>
        <Tabs
          value={value}
          indicatorColor='primary'
          textColor='primary'
          onChange={handleChange}
          aria-label='disabled tabs example'
        >
          <Tab label='Pending' />
          <Badge badgeContent={4} color='primary'>
            {' '}
          </Badge>

          <Tab label='All Claims' />
          <Badge badgeContent={4} color='primary'>
            {' '}
          </Badge>
        </Tabs>
      </Paper> */}
    </div>
  );
}
