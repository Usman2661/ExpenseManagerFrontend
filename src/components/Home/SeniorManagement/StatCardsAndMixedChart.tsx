import React, { useContext, useEffect, useState } from 'react';
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
import UserStore from '../../../MobX/store/UserStore';

import PeopleIcon from '@material-ui/icons/People';
import alasql from 'alasql';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import '../../../css/StatCardsAndMixedChart.css';
var dateFormat = require('dateformat');

var moment = require('moment'); // require
moment().format();

export interface MixedChartData {
  approvedData: Number[];
  labels: String[];
  pendingData: Number[];
  rejectedData: Number[];
}


function StatCardsAndMixedChart() {
  const expenseStore = useContext(ExpenseStore);
  const { seniorExpenses, getSeniorExpenses, info } = expenseStore;

  const userStore = useContext(UserStore);
  const { infoUser, getUsers  } = userStore;


  const [chartData, setChartData] = useState<MixedChartData>({
    approvedData: [],
    labels: [],
    pendingData: [],
    rejectedData: [],
  });

  const { approvedData, labels, pendingData, rejectedData  } = chartData;

  const [value, setValue] = React.useState('Daily');


  useEffect(() => {
    getUsers();
    getSeniorExpenses();
  }, []);


    seniorExpenses.map((expense: any) => {
      const myDate = new Date(parseInt(expense.createdAt));
      const dateWeek =  moment(myDate, 'DD/MM/YYYY').startOf('isoWeek')._d;
      const calculateWeekend =  new Date(dateFormat(dateWeek, 'yyyy-mm-dd'));
      const weekend=new Date(calculateWeekend.getFullYear(),calculateWeekend.getMonth(),calculateWeekend.getDate()+6);
      const lastDayofWeek = dateFormat(weekend, 'dS mmmm');
      expense['Week'] =  dateFormat(dateWeek, 'dS') + ' - ' + lastDayofWeek;
      expense['Week1'] =  dateFormat(myDate, 'W');
      expense['Date'] = dateFormat(myDate, 'dS mmmm');
      expense['Month'] = dateFormat(myDate, 'mmmm yyyy');
      expense['MonthInitial'] = dateFormat(myDate, 'm');
      return expense;
    });
  

     const dailyTotals = alasql(
      'SELECT SUM(case when status = "Pending" then amount else 0 end) as pending,SUM(case when status = "Rejected" then amount else 0 end) as rejected,SUM(case when status = "Approved" then amount else 0 end) as approved, Date  FROM ? group by Date',
      [seniorExpenses]
    );
  
      const monthlyTotals = alasql(
        'SELECT SUM(case when status = "Pending" then amount else 0 end) as pending,SUM(case when status = "Rejected" then amount else 0 end) as rejected,SUM(case when status = "Approved" then amount else 0 end) as approved, Month, MonthInitial  FROM ? group by Month,MonthInitial Order By MonthInitial ASC',
        [seniorExpenses]
      );
    
       const weeklyTotals = alasql(
        'SELECT SUM(case when status = "Pending" then amount else 0 end) as pending,SUM(case when status = "Rejected" then amount else 0 end) as rejected,SUM(case when status = "Approved" then amount else 0 end) as approved, Week, Week1  FROM ? group by Week,Week1 Order By Week1 ASC',
        [seniorExpenses]
      );
    

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const changeValue= (event.target as HTMLInputElement).value;
    setValue(changeValue);
    
    await setChartData({
      ...chartData,
      labels: [],
      approvedData: [],
      pendingData:[],
      rejectedData: []
    });

    await handleFilterChange();
   
  };


  const handleFilterChange = async () => {

     if (value =='Daily'){
    if (dailyTotals[0].Date !== undefined && dailyTotals.length != labels.length) {
      dailyTotals.map((expense: any) => {
        approvedData.push(parseInt(expense.approved));
        pendingData.push(parseInt(expense.pending));
        rejectedData.push(parseInt(expense.rejected));
        labels.push(expense.Date.toString());
      });
    }
  }

  if (value =='Weekly'){

    if (weeklyTotals[0].Week !== undefined && weeklyTotals.length != labels.length) {
      weeklyTotals.map((expense: any) => {
        approvedData.push(parseInt(expense.approved));
        pendingData.push(parseInt(expense.pending));
        rejectedData.push(parseInt(expense.rejected));
        labels.push(expense.Week.toString());
      });
    }
  }


  if (value == 'Monthly'){

  
    if (monthlyTotals[0].approved !== undefined && monthlyTotals.length != labels.length ) {
      monthlyTotals.map((expense: any) => {
        approvedData.push(parseInt(expense.approved));
        pendingData.push(parseInt(expense.pending));
        rejectedData.push(parseInt(expense.rejected));
        labels.push(expense.Month.toString());
      });
    }
    
  }
  }

  handleFilterChange();



  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={6} md={3} lg={3}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                  marginTop:'20px',
                  marginBottom:'20px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>
                    Expenses
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    £<CountUp end={info.totalExpensesSenior} />
                  </h1>
                </div>

                <LocalAtmIcon
                  style={{ fontSize: 50, float: 'right', color: 'red' }}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            variant='outlined'
            className='amountClaimedSenior'
        
          >
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                  marginTop:'20px',
                  marginBottom:'20px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>
                    Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={info.totalClaimsSenior} />
                  </h1>
                </div>

                <EqualizerIcon
                  style={{ fontSize: 50, float: 'right', color: 'purple' }}
                />
              </div>
            </CardContent>
          </Card>

       
        </Grid>

        <Grid item xs={12} sm={6} md={3} lg={3}>
        

          <Card
            variant='outlined'
            className='amountClaimed'
          
          >
            <CardContent>
              <div
                style={{
                  width: '100%',
                  paddingTop: '5px',
                  paddingBottom: '70px',
                  marginTop:'20px',
                  marginBottom:'20px',
                }}
              >
                <div style={{ float: 'left' }}>
                  <Typography style={{ color: 'grey' }}>
                    Users
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>
                    <CountUp end={infoUser.total} />
                  </h1>
                </div>

                <PeopleIcon
                  style={{ fontSize: 50, float: 'right', color: 'blue' }}
                />
              </div>
            </CardContent>
          </Card>

          <Card
            variant='outlined'
            className='approvalRateSenior'
            
          >
            <CardContent>
              <div
                style={{
                  width: '100%',
                  marginTop:'20px',
                  marginBottom:'20px',
                }}
              >
                <Typography style={{ color: 'grey' }}>Approval Rate</Typography>
                <Grid className='linearProgress' container>
                  <Grid item xs={12}>
                    <h2 style={{ marginTop: 'auto' }}>
                      <CountUp end={info.acceptRateSenior} />%
                    </h2>
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

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <FormControl component='fieldset'>
                <RadioGroup
                  aria-label='gender'
                  name='gender1'
                  value={value}
                  onChange={handleChange}
                >
                  <Grid
                    className='radioButtonGroup'
                    container
                    direction='row'
                    spacing={2}
                    style={{ margin: 0, width: '100%' }}
                  >
                    <FormControlLabel
                      value='Daily'
                      control={<Radio />}
                      label='Daily'
                    />
                    <FormControlLabel
                      value='Weekly'
                      control={<Radio />}
                      label='Weekly'
                    />
                    <FormControlLabel
                      value='Monthly'
                      control={<Radio />}
                      label='Monthly'
                    />
                  </Grid>
                </RadioGroup>
              </FormControl>
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
