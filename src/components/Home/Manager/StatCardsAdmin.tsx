import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import PeopleIcon from '@material-ui/icons/People';
import '../../../css/StatCards.css';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { observer } from 'mobx-react-lite';
import CountUp from 'react-countup';
import UserStore from '../../../MobX/store/UserStore';

function StatCardsAdmin() {
  const expenseStore = useContext(ExpenseStore);
  const { info } = expenseStore;

  const userStore = useContext(UserStore);
  const { getManagerUsers, infoUser } = userStore;

  useEffect(() => {
    getManagerUsers();
  }, []);

  return (
    <div>
      <Grid
        className='cardContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={6} md={6} lg={3}>
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
                    Pending Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={info.pendingClaimsManager} />
                  </h1>
                </div>

                <HourglassEmptyIcon
                  style={{ fontSize: 80, float: 'right', color: 'red' }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>My Users</Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={infoUser.managerUsersTotal} />
                  </h1>
                </div>

                <PeopleIcon
                  style={{ fontSize: 80, float: 'right', color: 'blue' }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card variant='outlined' className='totalClaims'>
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
                    Amount Approved
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £ <CountUp decimals={2} end={info.totalApprovedManager} />
                  </h1>
                </div>

                <MonetizationOnIcon
                  style={{
                    fontSize: 80,
                    float: 'right',
                    color: 'green',
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={3}>
          <Card variant='outlined' className='totalClaims'>
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
                    Amount Pending
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £
                    <CountUp decimals={2} end={info.totalPendingManager} />
                  </h1>
                </div>

                <MonetizationOnIcon
                  style={{
                    fontSize: 80,
                    float: 'right',
                    color: 'red',
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(StatCardsAdmin);
