import React, { useState, useEffect, useContext } from 'react';
import MaterialTable from 'material-table';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { toJS } from 'mobx';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { IUser } from '../../models/User';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanyStore from '../../MobX/store/CompanyStore';
import { ICompany } from '../../models/Company';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import UserStore from '../../MobX/store/UserStore';
import UsersModal from './UsersModal';

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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(2),
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  })
);
export interface IUserModalDataState {
  showUserModal: boolean;
  editUser: boolean;
  user?: IUser;
}
function Users(props: any) {
  const classes = useStyles();

  const [userModalData, setUserModalData] = useState<IUserModalDataState>({
    showUserModal: false,
    editUser: false,
  });

  const { showUserModal, editUser } = userModalData;

  const userStore = useContext(UserStore);
  const { users, usersLoaded, getUsers, deleteUser } = userStore;

  useEffect(() => {
    getUsers();
  }, []);

  const closeUsermodal = () => {
    setUserModalData({
      ...userModalData,
      editUser: false,
      showUserModal: false,
    });
  };

  const onDeleteUser = async (id?: number) => {
    deleteUser(id);
  };

  const onCreateUser = async () => {
    setUserModalData({
      ...userModalData,
      user: undefined,
      editUser: false,
      showUserModal: true,
    });
  };

  const onEditUser = async (myUser: IUser) => {
    setUserModalData({
      ...userModalData,
      user: myUser,
      editUser: true,
      showUserModal: true,
    });
  };

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'User Type', field: 'userType' },
      { title: 'Job Title', field: 'jobTitle' },
      { title: 'Department', field: 'department' },
      {
        field: 'Company',
        title: 'Company',
        render: (rowData: IUser) => {
          return rowData.Company?.name;
        },
      },
    ],
  });

  return (
    <div>
      {showUserModal ? (
        <UsersModal
          edit={editUser}
          user={userModalData.user}
          onCancel={closeUsermodal}
        />
      ) : null}
      {usersLoaded ? (
        <MaterialTable
          title='Users'
          columns={state.columns}
          data={users}
          icons={tableIcons}
          options={{
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                console.log(oldData);
                onDeleteUser(oldData.id);
                resolve();
              }),
          }}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: 'Edit User',
              onClick: (event, rowData: any) => {
                const myUser: IUser = {
                  id: rowData.id,
                  name: rowData.name,
                  email: rowData.email,
                  userType: rowData.userType,
                  department: rowData.department,
                  managerId: rowData.managerId,
                  jobTitle: rowData.jobTitle,
                  companyId: rowData.companyId,
                };
                onEditUser(myUser);
              },
            },
          ]}
        />
      ) : (
        <CircularProgress style={{ marginLeft: '45%' }} />
      )}

      <Tooltip title='Add User' aria-label='Add User'>
        <Fab
          color='primary'
          onClick={onCreateUser}
          style={{ float: 'right', marginTop: '1%' }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default observer(Users);
