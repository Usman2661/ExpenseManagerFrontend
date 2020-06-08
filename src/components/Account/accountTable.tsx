import React from 'react';
import MaterialTable, { Column } from 'material-table';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { forwardRef } from 'react';

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
import { IUser } from '../../models/User';
import { useQuery } from 'react-apollo';
import { GET_USERS } from '../../graphQL/query/query';

const tableIcons = {
  // Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  // Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  // Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  // DetailPanel: forwardRef((props, ref) => (
  //   <ChevronRight {...props} ref={ref} />
  // )),
  // Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  // Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  // Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  // NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  // PreviousPage: forwardRef((props, ref) => (
  //   <ChevronLeft {...props} ref={ref} />
  // )),
  // ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  // Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  // SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  // ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

// interface TableState {
//   columns: Array<Column<IUser>>;
//   data?: IUser[];
// }
interface UserData {
  allUsers: IUser[];
}

interface UserDataVars {}

export function AccountTable() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'User Type', field: 'userType' },
      { title: 'Job Title', field: 'jobTitle' },
      { title: 'Department', field: 'department' },
    ],
    data: [
      {
        name: 'Usman',
        email: 'usmanusman136@hotmail.com',
        userType: 'Staff',
        department: 'Technology',
        jobTitle: 'Software Dev',
      },
      {
        name: 'Safan',
        email: 'safian@hotmail.com',
        userType: 'Manager',
        department: 'HR',
        jobTitle: 'HR Manager',
      },
      {
        name: 'Sanum',
        email: 'sanum@hotmail.com',
        userType: 'Senior',
        department: 'Sales',
        jobTitle: 'Accountant',
      },
    ],
  });

  const { loading, data } = useQuery(GET_USERS);

  return (
    <MaterialTable
      title='Users'
      columns={state.columns}
      data={data?.allUsers}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            // setTimeout(() => {
            //   resolve();
            //   setState((prevState) => {
            //     const data = [...prevState.data];
            //     data.push(newData);
            //     return { ...prevState, data };
            //   });
            // }, 600);
            console.log(newData);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            // setTimeout(() => {
            //   resolve();
            //   if (oldData) {
            //     setState((prevState) => {
            //       const data = [...prevState.data];
            //       data[data.indexOf(oldData)] = newData;
            //       return { ...prevState, data };
            //     });
            //   }
            // }, 600);
            console.log(oldData, newData);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            // setTimeout(() => {
            //   resolve();
            //   setState((prevState) => {
            //     const data = [...prevState.data];
            //     data.splice(data.indexOf(oldData), 1);
            //     return { ...prevState, data };
            //   });
            // }, 600);

            console.log(oldData);
            resolve();
          }),
      }}
    />
  );
}
