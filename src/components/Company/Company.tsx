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
import { observer } from 'mobx-react-lite';
import CircularProgress from '@material-ui/core/CircularProgress';
import CompanyStore from '../../MobX/store/CompanyStore';
import CompanyModal from './CompanyModal';
import { ICompany } from '../../models/Company';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
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
export interface ICompanyModalDataState {
  showCompanyModal: boolean;
  editCompany: boolean;
  company?: ICompany;
}
function Company(props: any) {
  const classes = useStyles();

  const [companyModalData, setCompanyModalData] = useState<
    ICompanyModalDataState
  >({
    showCompanyModal: false,
    editCompany: false,
  });

  const { showCompanyModal, editCompany } = companyModalData;

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

  const onCreateCompany = async () => {
    setCompanyModalData({
      ...companyModalData,
      company: undefined,
      editCompany: false,
      showCompanyModal: true,
    });
  };

  const onEditCompany = async (myCompany: ICompany) => {
    setCompanyModalData({
      ...companyModalData,
      company: myCompany,
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
    <div>
      {showCompanyModal ? (
        <CompanyModal
          edit={editCompany}
          company={companyModalData.company}
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
                console.log(oldData);
                onDeleteCompany(oldData.id);
                resolve();
              }),
          }}
          actions={[
            {
              icon: () => <Edit />,
              tooltip: 'Edit Company',
              onClick: (event, rowData: any) => {
                const myCompany: ICompany = {
                  id: rowData.id,
                  name: rowData.name,
                  addressFirstLine: rowData.addressFirstLine,
                  addressSecondLine: rowData.addressSecondLine,
                  addressThirdLine: rowData.addressThirdLine,
                  postcode: rowData.postcode,
                  registerYear: rowData.registerYear,
                  phone: rowData.phone,
                  businessArea: rowData.businessArea,
                };

                onEditCompany(myCompany);
              },
            },
          ]}
        />
      ) : (
        <CircularProgress style={{ marginLeft: '45%' }} />
      )}

      <Tooltip title='Add Company' aria-label='Add Company'>
        <Fab
          color='primary'
          onClick={onCreateCompany}
          style={{ float: 'right', marginTop: '1%' }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}

export default observer(Company);
