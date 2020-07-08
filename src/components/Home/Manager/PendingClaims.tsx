import React, { useState, useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import '../../../css/StatCardsAdmin.css';
import '../../../css/PendingClaims.css';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';

//Material Table
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
import { observer } from 'mobx-react-lite';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import CountUp from 'react-countup';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { IExpense } from '../../../models/Expense';
import { useHistory } from 'react-router-dom';
import alasql from 'alasql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
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

function PendingClaims() {
  const classes = useStyles();
  const history = useHistory();

  const expenseStore = useContext(ExpenseStore);
  const { getManagerExpenses, managerExpenses } = expenseStore;

  useEffect(() => {
    getManagerExpenses();
  }, []);

  const pendingExpenses = managerExpenses.filter((expense: IExpense) => {
    return expense.status === 'Pending';
  });

  const mergeExpense = managerExpenses.map((expense: IExpense) => {
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

  const topUsers = alasql(
    'SELECT SUM(amount) AS totalClaimed,name,jobTitle FROM ? Group By name, jobTitle',
    [mergeExpense]
  );

  topUsers.sort(function (a: any, b: any) {
    return b.totalClaimed - a.totalClaimed;
  });

  return (
    <div>
      <Grid
        className='pendingClaimContainer'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={12} md={5} lg={4}>
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

        <Grid item xs={12} sm={12} md={7} lg={8}>
          <Card variant='outlined' className='topUsers'>
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

export default observer(PendingClaims);
