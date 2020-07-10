import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { observer } from 'mobx-react-lite';
import CountUp from 'react-countup';
import LinearProgress from '@material-ui/core/LinearProgress';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import MixedChart from '../../Charts/MixedChart';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import alasql from 'alasql';
import { IExpense } from '../../../models/Expense';
var dateFormat = require('dateformat');

function StatCardsAndMixedChart() {
  const expenseStore = useContext(ExpenseStore);
  const { seniorExpenses, getSeniorExpenses, info } = expenseStore;

  let approvedData: Number[] = [];
  let labels: String[] = [];
  let pendingData: Number[] = [];
  let rejectedData: Number[] = [];

  useEffect(() => {
    getSeniorExpenses();
  }, []);

  seniorExpenses.map((expense: any) => {
    const myDate = new Date(parseInt(expense.createdAt));
    expense['Date'] = dateFormat(myDate, 'dS mmmm');
    return expense;
  });

  const dailyTotals = alasql(
    'SELECT SUM(case when status = "Pending" then amount else 0 end) as pending,SUM(case when status = "Rejected" then amount else 0 end) as rejected,SUM(case when status = "Approved" then amount else 0 end) as approved , Date FROM ? group by Date',
    [seniorExpenses]
  );

  console.log(dailyTotals);

  if (dailyTotals[0].Date !== undefined) {
    dailyTotals.map((expense: any) => {
      approvedData.push(parseInt(expense.approved));
      pendingData.push(parseInt(expense.pending));
      rejectedData.push(parseInt(expense.rejected));
      labels.push(expense.Date.toString());
    });
  }

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
                    £<CountUp end={info.totalExpensesSenior} />
                  </h1>
                </div>

                <LocalAtmIcon
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
                    Total Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={info.totalClaimsSenior} />
                  </h1>
                </div>

                <EqualizerIcon
                  style={{ fontSize: 80, float: 'right', color: 'purple' }}
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
                <Grid className='linearProgress' container>
                  <Grid item xs={2}>
                    <h1 style={{ marginTop: 'auto' }}>
                      <CountUp end={info.acceptRateSenior} />%
                    </h1>
                  </Grid>
                  <Grid item xs={10}>
                    {' '}
                    <LinearProgress
                      variant='determinate'
                      value={info.acceptRateSenior}
                      style={{ marginTop: 'auto' }}
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
              <MixedChart
                labels={labels}
                approvedData={approvedData}
                pendingData={pendingData}
                rejectedData={rejectedData}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(StatCardsAndMixedChart);
