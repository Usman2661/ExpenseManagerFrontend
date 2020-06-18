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
import CompanyModal from './CompanyModal';
import { ICompany } from '../../models/Company';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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

function Company(props: any) {
  const classes = useStyles();

  const [companyModalData, setCompanyModalData] = useState({
    showCompanyModal: false,
    editCompany: false,
    company: {
      name: '',
      addressFirstLine: '',
      postcode: '',
      phone: 0,
      businessArea: '',
      registerYear: 0,
    },
  });

  const { showCompanyModal, editCompany, company } = companyModalData;

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

  const closeCompanyModal = () => {
    setCompanyModalData({
      ...companyModalData,
      editCompany: false,
      showCompanyModal: false,
    });
  };

  const onDeleteCompany = async (id?: number) => {
    deleteCompany(id);
  };

  const onEditCompany = async (company: ICompany) => {
    setCompanyModalData({
      ...companyModalData,
      editCompany: true,
      showCompanyModal: true,
    });
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
      {showCompanyModal ? (
        <CompanyModal
          edit={editCompany}
          company={company}
          onCancel={closeCompanyModal}
        />
      ) : null}
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
          actions={[
            {
              icon: () => <Edit />,
              tooltip: 'Edit Company',
              onClick: (event, rowData: any) => onEditCompany(rowData),
            },
          ]}
        />
      ) : (
        <CircularProgress style={{ marginLeft: '45%' }} />
      )}

      <Tooltip title='Add' aria-label='add'>
        <Fab color='secondary' className={classes.absolute}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default observer(Company);
