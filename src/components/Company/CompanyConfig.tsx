import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { observer } from 'mobx-react-lite';

import Avatar from '@material-ui/core/Avatar';

import { Typography } from '@material-ui/core';
import UserStore from '../../MobX/store/UserStore';

function CompanyConfig() {
  const userStore = useContext(UserStore);
  const { userProfile, userProfileLoaded, getUserProfile } = userStore;

  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        justify='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={4} md={4} lg={6}>
          <Card variant='outlined' className='cardRaiased'>
            <CardContent>
              <div
                className='ProfileSettings'
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '0',
                  wordSpacing: 'none',
                }}
              >
                <Avatar
                  //   className={classes.orange}
                  style={{ height: '90px', width: '90px' }}
                >
                  <h1 style={{ fontSize: '40' }}>
                    {(userProfile.Company?.name || '?').charAt(0)}
                  </h1>
                </Avatar>
                <Typography style={{ marginTop: 'auto' }} variant='h4'>
                  {userProfile.Company?.name}
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',

                    fontWeight: 'bold',
                    color: '#7B7D7D',
                  }}
                >
                  {userProfile.Company?.businessArea}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(CompanyConfig);
