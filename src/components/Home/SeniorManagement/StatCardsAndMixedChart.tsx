import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PeopleIcon from '@material-ui/icons/People';
import CountUp from 'react-countup';
import LinearProgress from '@material-ui/core/LinearProgress';

import MixedChart from '../../Charts/MixedChart';

export default function StatCardsAndMixedChart() {
  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>
                    Total Expenses
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £<CountUp end={20} />
                  </h1>
                </div>

                <HourglassEmptyIcon
                  style={{ fontSize: 80, float: 'right', color: 'red' }}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            variant='outlined'
            className='amountClaimed'
            style={{ marginTop: '1%' }}
          >
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>
                    Pending Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={10} />
                  </h1>
                </div>

                <HourglassEmptyIcon
                  style={{ fontSize: 80, float: 'right', color: 'red' }}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            variant='outlined'
            className='amountClaimed'
            style={{ marginTop: '1%' }}
          >
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                }}
              >
                <Typography style={{ color: 'grey' }}>Approval Rate</Typography>
                <Grid
                  className='linearProgress'
                  container
                  direction='row'
                  style={{ margin: 0, width: '100%' }}
                >
                  <Grid item xs={2}>
                    <h1 style={{ marginTop: 'auto' }}>
                      <CountUp end={10} />%
                    </h1>
                  </Grid>
                  <Grid item xs={10}>
                    {' '}
                    <LinearProgress
                      variant='determinate'
                      value={10}
                      //   style={{ marginTop: '6%' }}
                    />
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <MixedChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
