import React, { useState, useEffect, useContext } from 'react';
import MaterialTable, { Column } from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { forwardRef } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLazyQuery } from '@apollo/react-hooks';
import Button from '@material-ui/core/Button';
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
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Icons } from 'material-table';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import { IUser } from '../../models/User';
import { useQuery } from 'react-apollo';
import { GET_USERS, GET_USER } from '../../graphQL/query/query';
import { DELETE_USER } from '../../graphQL/mutation/user.mutation';
import { useMutation } from '@apollo/react-hooks';
import { UpdateAccount } from './UpdateAccount';
import { setHeaders } from '../../graphQL/graphqlconfig';
import { UserContext } from '../../userContext';

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

interface UserData {
  allUsers: IUser[];
}

interface UserDataVars {}

export function AccountTable(props: any) {
  const history = useHistory();

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const [tableData, setTableData] = useState({
    currentRecord: 0,
    data: [],
  });
  useEffect(() => {
    loadUsers();
  }, []);

  const onDeleteUser = async (oldData: number) => {
    await setTableData({ ...tableData, currentRecord: oldData });
    try {
      const { data } = await deleteUser();
      loadUsers();
    } catch (e) {
      console.error(e);
    }
  };

  const [deleteUser, { error, data: deletedUser }] = useMutation(DELETE_USER, {
    errorPolicy: 'ignore',
    variables: {
      id: tableData.currentRecord,
    },
  });

  const loadUsers = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(GET_USERS);
      setTableData({ ...tableData, data: data.allUsers });

      setUserAuthData({
        ...userAuthData,
        allUsers: data.allUsers,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'User Type', field: 'userType' },
      { title: 'Job Title', field: 'jobTitle' },
      { title: 'Department', field: 'department' },

      {
        field: 'status',
        title: 'Status',
        render: (rowData: any) => {
          return rowData.userType && rowData.managerId ? (
            <Alert variant='filled' severity='success'>
              Approved
            </Alert>
          ) : (
            <Alert variant='filled' severity='error'>
              Pending
            </Alert>
          );
        },
      },
    ],
  });

  return (
    <div>
      <MaterialTable
        title='Users'
        columns={state.columns}
        data={tableData.data}
        icons={tableIcons}
        options={{
          actionsColumnIndex: -1,
        }}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              onDeleteUser(oldData.id);
              resolve();
            }),
        }}
        actions={[
          {
            icon: () => <AccountCircleIcon />,
            tooltip: 'Approve User',
            onClick: (event, rowData) =>
              history.push(`/accountupdate?id=${rowData.id}`),
          },
        ]}
      />
    </div>
  );
}
