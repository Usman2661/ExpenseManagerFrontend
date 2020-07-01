import React, { useState } from 'react';
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

  const [state, setState] = useState({
    columns: [
      { title: 'Title', field: 'title' },
      {
        title: 'User',
        field: 'user',
        render: (rowData: any) => {
          return (
            <div style={{ display: 'flex' }}>
              <ListItemAvatar>
                <Avatar className={classes.orange}>U</Avatar>
              </ListItemAvatar>
              <ListItemText primary='Usman' />
            </div>
          );
        },
      },
      {
        title: 'Amount',
        field: 'amount',
        render: (rowData: any) => {
          return <b>£{rowData.amount}</b>;
        },
      },

      {
        title: 'Status',
        field: 'status',
        render: (rowData: any) => {
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

  const expenses = [
    {
      id: 1,
      title: 'Test',
      user: 'Usman',
      amount: 200,
      status: 'Pending',
    },
    {
      id: 2,
      title: 'Breakfast',
      user: 'Safian',
      amount: 12,
      status: 'Pending',
    },
  ];

  return (
    <div>
      <Grid
        className='pendingClaimContainer'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Card variant='outlined' className='topUsers'>
            <CardHeader title='Top Users' />

            <Divider />
            <CardContent>
              <List className={classes.root}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.orange}>U</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary='Usman'
                    secondary='Software Developer'
                  />

                  <h3> £200 </h3>
                </ListItem>
                <Divider></Divider>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.orange}>J</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary='Jean-Marc'
                    secondary='Development Manager'
                  />

                  <h3> £200 </h3>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={8}>
          <MaterialTable
            title='Pending Claims'
            columns={state.columns}
            data={expenses}
            icons={tableIcons}
            options={{
              actionsColumnIndex: -1,
            }}
            actions={[
              {
                icon: () => <VisibilityIcon />,
                tooltip: '',
                onClick: (event, rowData: any) => {
                  // const myCompany: ICompany = {
                  //   id: rowData.id,
                  //   name: rowData.name,
                  //   addressFirstLine: rowData.addressFirstLine,
                  //   addressSecondLine: rowData.addressSecondLine,
                  //   addressThirdLine: rowData.addressThirdLine,
                  //   postcode: rowData.postcode,
                  //   registerYear: rowData.registerYear,
                  //   phone: rowData.phone,
                  //   businessArea: rowData.businessArea,
                  // };
                  // onEditCompany(myCompany);
                },
              },
            ]}
          />
          {/* </CardContent>
          </Card> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(PendingClaims);
