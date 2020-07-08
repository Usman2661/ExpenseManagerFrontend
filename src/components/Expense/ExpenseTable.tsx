import React, { useEffect, useContext, useState } from 'react';
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
import { useHistory } from 'react-router-dom';
import alasql from 'alasql';
import ExpenseStore from '../../MobX/store/ExpenseStore';
import { IExpense, ExpenseStatus } from '../../models/Expense';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
var dateFormat = require('dateformat');

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
function ExpenseTable() {
  const history = useHistory();

  const expenseStore = useContext(ExpenseStore);
  const { getManagerExpenses, managerExpenses } = expenseStore;

  useEffect(() => {
    getManagerExpenses();
  }, []);

  const renderStatus = (status: ExpenseStatus) => {
    let color;
    if (status === 'Approved') {
      color = 'green';
    }
    if (status === 'Pending') {
      color = '#F5B041';
    }
    if (status === 'Rejected') {
      color = 'red';
    }

    return (
      <span
        className='jss1936'
        style={{
          color: 'white',
          backgroundColor: color,
        }}
      >
        {status}
      </span>
    );
  };

  const renderDate = (createdAt?: string) => {
    if (createdAt) {
      const myDate = new Date(parseInt(createdAt));

      const date = dateFormat(myDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT');

      return date;
    }
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
        title: 'Date Time',
        field: 'DateTime',
        render: (rowData: IExpense) => {
          return renderDate(rowData.createdAt?.toString());
          // return (
          //   <b>
          //     £ <CountUp decimals={2} end={rowData.amount} />
          //   </b>
          // );
        },
      },

      {
        title: 'Status',
        field: 'status',
        render: (rowData: IExpense) => {
          return renderStatus(rowData.status);
        },
      },
    ],
  });

  return (
    <div>
      <Grid
        className='allExpenseContainer'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12}>
          <MaterialTable
            title='Expense Claims'
            columns={state.columns}
            data={managerExpenses}
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
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(ExpenseTable);
