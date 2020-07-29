import React, { useContext, useEffect, useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CardHeader from '@material-ui/core/CardHeader';

import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CountUp from 'react-countup';
import HotelIcon from '@material-ui/icons/Hotel';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import alasql from 'alasql';
import CommuteIcon from '@material-ui/icons/Commute';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HelpIcon from '@material-ui/icons/Help';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import BasicBar from '../../Charts/BasicBar';
import { IExpense } from '../../../models/Expense';
import RadialBar from '../../Charts/RadialBar';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


//Material Table
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MaterialTable from 'material-table';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { useHistory } from 'react-router-dom';

import '../../../css/DepartmentPieTypeList.css';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    typeIcon: {
      fontSize: 70,
      float: 'left',
      color: 'blue',
    },
    deepPurple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

const tableIcons: any = {
  Add: () => <AddBox />,
  Check: () => <Check />,
  Clear: () => <Clear />,
  Delete: () => <DeleteOutline />,
  DetailPanel: () => <ChevronRight />,
  Edit: () => <Edit />,
  Export: () => <SaveAlt />,
  Filter: () => <FilterList />,
  FirstPage: () => <FirstPage />,
  LastPage: () => <LastPage />,
  NextPage: () => <ChevronRight />,
  PreviousPage: () => <ChevronLeft />,
  ResetSearch: () => <Clear />,
  Search: () => <Search />,
  SortArrow: () => <ArrowDownward />,
  ThirdStateCheck: () => <Remove />,
  AccountCircle: () => <AccountCircleIcon />,
  ViewColumn: () => <ViewColumn />,
};

function DepartmentPieTypeList() {
  const history = useHistory();
  const classes = useStyles();
  const expenseStore = useContext(ExpenseStore);
  const { seniorExpenses, info , managerExpenses , getManagerExpenses } = expenseStore;

  useEffect(() => {
    getManagerExpenses();
  }, []);

  let labels: String[] = [];
  let data: Number[] = [];

  let labelsUser: String[] = [];
  let dataUser: Number[] = [];

  
  let labelsRadial: String[] = [];
  let dataRadial: Number[] = [];


  const mergeExpense = seniorExpenses.map((expense: IExpense) => {
    const myExpense = {
      id: expense?.id,
      amount: expense.amount,
      type: expense.type,
      name: expense?.User?.name,
      department: expense?.User?.department,
      jobTitle: expense?.User?.jobTitle,
    };

    return myExpense;
  });

 // Constructing Data for Radial Charts
 const radialChart = [
   {
     name: 'Approved',
     total: info.totalApprovedSenior
   }
   ,{
    name: 'Rejected',
    total: info.totalRejectedSenior
  },{
    name: 'Pending',
    total: info.totalPendingSenior
  },{
    name: 'Pending Claims',
    total: info.totalPendingClaimSenior
  }
 ]

 if (radialChart[0].total !== 0 || radialChart[1].total !== 0 || radialChart[2].total !== 0 || radialChart[3].total !== 0 ) {
  radialChart.map((radialData: any) => {
    dataRadial.push(parseInt(radialData.total));
    labelsRadial.push(radialData.name.toString());
  });
}

  const topDepartment = alasql(
    'SELECT SUM(amount) AS totalClaimed,count(type) as claims, department FROM ? Group By department',
    [mergeExpense]
  );

  topDepartment.sort(function (a: any, b: any) {
    return b.totalClaimed - a.totalClaimed;
  });

  if (topDepartment[0].department !== undefined) {
    topDepartment.map((expense: any) => {
      data.push(parseInt(expense.totalClaimed));
      labels.push(expense.department.toString());
    });
  }

  const topUsers = alasql(
    'SELECT SUM(amount) AS totalClaimed,name,jobTitle FROM ? Group By name, jobTitle ORDER BY totalClaimed DESC LIMIT 5 ',
    [mergeExpense]
  );


  topUsers.sort(function (a: any, b: any) {
    return b.totalClaimed - a.totalClaimed;
  });

  if (topUsers[0].name !== undefined) {
    topUsers.map((expense: any) => {
      dataUser.push(parseInt(expense.totalClaimed));
      labelsUser.push(expense.name.toString());
    });
  }


  const topExpenseType = alasql(
    'SELECT SUM(amount) AS totalClaimed,count(title) as claims, type FROM ? Group By type',
    [seniorExpenses]
  );

  topExpenseType.sort(function (a: any, b: any) {
    return b.totalClaimed - a.totalClaimed;
  });


  const pendingExpenses = managerExpenses.filter((expense: IExpense) => {
    return expense.status === 'Pending';
  });

  const setExpenseIcon = (expenseType: String) => {
    const expenseTypeIcons = [
      {
        type: 'Food',
        icon: <FastfoodIcon />,
      },
      {
        type: 'Transport',
        icon: <CommuteIcon />,
      },
      {
        type: 'Accomodation',
        icon: <HotelIcon />,
      },
      {
        type: 'Training',
        icon: <MenuBookIcon />,
      },
      {
        type: 'Equipment',
        icon: <DevicesOtherIcon />,
      },
      {
        type: 'Other',
        icon: <HelpIcon />,
      },
    ];

    let expenseIcon = expenseTypeIcons.find(
      (expenseIcon) => expenseIcon.type === expenseType
    );
    return expenseIcon?.icon;
  };


  const [state, setState] = useState({
    columns: [
      { title: 'Title', field: 'title' },
      {
        title: 'User',
        field: 'user',
        render: (rowData: IExpense) => {
          return (
            <div style={{ display: 'flex' }}>
              <PersonIcon />
              <text>{rowData.User?.name}</text>
            </div>
          );
        },
      },
      {
        title: 'Amount',
        field: 'amount',
        render: (rowData: IExpense) => {
          return (
            <b>
              £ <CountUp decimals={2} end={rowData.amount} />
            </b>
          );
        },
      },

      {
        title: 'Status',
        field: 'status',
        render: (rowData: IExpense) => {
          return (
            <span
              className='jss1936'
              style={{
                color: 'white',
                backgroundColor: '#F5B041',
              }}
            >
              {rowData.status}
            </span>
          );
        },
      },
    ],
  });

  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
     <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card variant='outlined' className='topDepartments'>
          <CardHeader title='Top Departments' />

<Divider />
            <CardContent>
          
                <div >
                <BasicBar labels={labels} data={data} />
                </div>
        
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
         
        <Card variant='outlined' className='topUsers'>
            <CardHeader title='Top Users' />

            <Divider />
            <CardContent>
              <List className={classes.root}>
                {topUsers.length > 0 ? (
                  <div>
                    {topUsers.map((topUser: any) => (
                      <div>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.orange}>
                              {(topUser.name || '?').charAt(0)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={topUser.name}
                            secondary={topUser.jobTitle}
                          />
                          <h3>
                            £
                            <CountUp
                              decimals={2}
                              end={topUser.totalClaimed}
                            />{' '}
                          </h3>
                        </ListItem>
                        <Divider></Divider>
                      </div>
                    ))}
                  </div>
                ) : null}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card variant='outlined' className='expenseStats' >
          <CardHeader title='Expense Statistics' />

          <Divider />
            <CardContent>
            
               <RadialBar labels={labelsRadial} data={dataRadial} />
            
            </CardContent>
          </Card>
        </Grid>

     

        <Grid item xs={12} sm={12} md={6} lg={4}>
          <Card variant='outlined' className='expenseCats'>
          <CardHeader title='Top Expense Catagories' />

<Divider />
            <CardContent>
              <List className={classes.root}>
                {topExpenseType.length > 0 &&
                topExpenseType[0].type != undefined ? (
                  <div>
                    {topExpenseType.map((topExpense: any) => (
                      <div>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.deepPurple}>
                              {setExpenseIcon(topExpense.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={topExpense.type}
                            secondary={`Claims:${topExpense.claims}`}
                          />
                          <h3>
                            £
                            <CountUp
                              decimals={2}
                              end={topExpense.totalClaimed}
                            />
                          </h3>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </div>
                ) : null}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={8}>
          <Card variant='outlined' className='amountClaimed'>
         
            <MaterialTable
              title='Pending Claims'
              columns={state.columns}
              data={pendingExpenses}
              icons={tableIcons}
              options={{
                actionsColumnIndex: -1,
              }}
              actions={[
                {
                  icon: () => <VisibilityIcon />,
                  tooltip: '',
                  onClick: (event, rowData: any) => {
                    history.push(`/expense?id=${rowData.id}`);
                  },
                },
              ]}
            />
            <Button component={Link} to='/expenses' style={{ float: 'right' }}>
              View All
              <ChevronRightIcon />
            </Button>
           
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default observer(DepartmentPieTypeList);
