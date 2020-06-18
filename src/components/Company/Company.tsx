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
import { UserContext } from '../../userContext';
import UserStore from '../../MobX/store/UserStore';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanyStore from '../../MobX/store/CompanyStore';

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

function Company(props: any) {
  const history = useHistory();

  const companyStore = useContext(CompanyStore);
  const {
    companies,
    companiesLoaded,
    getCompanies,
    deleteCompany,
  } = companyStore;

  useEffect(() => {
    getCompanies();
  }, []);

  const onDeleteCompany = async (id?: number) => {
    deleteCompany(id);
  };

  const [state, setState] = useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'Adress Line 1', field: 'addressFirstLine' },
      { title: 'Post Code', field: 'postcode' },
      { title: 'Phone', field: 'phone' },
      { title: 'Business Area', field: 'businessArea' },
      { title: 'Register Year', field: 'registerYear' },
    ],
  });

  return (
    <div style={{ marginTop: '2%' }}>
      {companiesLoaded ? (
        <MaterialTable
          title='Companies'
          columns={state.columns}
          data={companies}
          icons={tableIcons}
          options={{
            actionsColumnIndex: -1,
          }}
          editable={{
            onRowDelete: (oldData) =>
              new Promise((resolve) => {
                onDeleteCompany(oldData.id);
                resolve();
              }),
          }}
          // actions={[
          //   {
          //     icon: () => <AccountCircleIcon />,
          //     tooltip: 'Approve User',
          //     onClick: (event, rowData: any) =>
          //       history.push(`/accountupdate?id=${rowData.id}`),
          //   },
          // ]}
        />
      ) : (
        <CircularProgress style={{ marginLeft: '45%' }} />
      )}
    </div>
  );
}

export default observer(Company);
