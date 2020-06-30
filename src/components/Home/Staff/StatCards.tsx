import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import '../../../css/StatCards.css';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { observer } from 'mobx-react-lite';
import CountUp from 'react-countup';

function StatCards() {
  const expenseStore = useContext(ExpenseStore);
  const { getExpenses, info } = expenseStore;

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
        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                    Amount Claimed
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £ <CountUp decimals={2} end={info.totalClaimed} />
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

        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                  <Typography style={{ color: 'grey' }}>
                    Amount Pending
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £ <CountUp decimals={2} end={info.totalPending} />
                  </h1>
                </div>

                <MonetizationOnIcon
                  style={{ fontSize: 80, float: 'right', color: 'red' }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={4}>
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
                    Total Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    {' '}
                    <CountUp end={info.total} />
                  </h1>
                </div>

                <AssessmentIcon
                  color='primary'
                  style={{ fontSize: 80, float: 'right' }}
                />
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(StatCards);
