import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { setHeaders } from '../../graphQL/graphqlconfig';
import AlertStore from './AlertStore';
import { AlertTypes } from '../../models/Alert';
import { getAlert } from './Alert';
import { ICompany } from '../../models/Company';
import {
  CREATE_COMPANY,
  UPDATE_COMPANY,
  DELETE_COMPANY,
} from '../../graphQL/mutation/company.mutation';
import { COMPANY, ALL_COMPANIES } from '../../graphQL/query/company.query';

class CompanyStore {
  constructor() {
    reaction(
      () => this.companies,
      (_) => this.companies.length
    );
  }

  @observable companies: ICompany[] = [];
  @observable company: any = {};
  @observable companiesLoaded: boolean = false;

  @action createCompany = async (company: ICompany) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        name: company.name,
        addressFirstLine: company.addressFirstLine,
        addressSecondLine: company.addressSecondLine,
        addressThirdLine: company.addressThirdLine,
        postcode: company.postcode,
        phone: company.phone,
        businessArea: company.businessArea,
        registerYear: company.registerYear,
      };
      const data = await graphQLClient.request(CREATE_COMPANY, variables);

      this.companies = [data.createCompany, ...this.companies];

      //Setting Alert
      const msg = `${data.createCompany.name} Company Successfully Created`;
      const alert = await getAlert(msg, '', AlertTypes.success);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      //Error Alert
      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'CreateCompanyError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action getCompany = async (id: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: id,
      };
      const data = await graphQLClient.request(COMPANY, variables);
      this.company = data.company;

      return data.company;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchCompanyError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action getCompanies = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(ALL_COMPANIES);
      this.companies = data.allCompanies;
      this.companiesLoaded = true;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(
        msg,
        'FetchCompaniesError',
        AlertTypes.error
      );
      AlertStore.setAlert(alert);
    }
  };

  @action updateCompany = async (company: ICompany) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: company.id,
        name: company.name,
        addressFirstLine: company.addressFirstLine,
        addressSecondLine: company.addressSecondLine,
        addressThirdLine: company.addressThirdLine,
        postcode: company.postcode,
        phone: company.phone,
        businessArea: company.businessArea,
        registerYear: company.registerYear,
      };
      const data = await graphQLClient.request(UPDATE_COMPANY, variables);

      this.companies = this.companies.map((company: ICompany) => {
        if (company.id === data.updateCompany.id) {
          return data.updateCompany;
        }
        return company;
      });

      const msg = `Company ${data.updateCompany.name} Updated`;
      const alert = await getAlert(msg, '', AlertTypes.success);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'UpdateCompanyError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action deleteCompany = async (id?: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id,
      };
      const data = await graphQLClient.request(DELETE_COMPANY, variables);
      this.companies = this.companies.filter(
        (company) => company.id !== data.deleteCompany.id
      );

      const msg = `Company Deleted Succesfullly`;
      const alert = await getAlert(msg, '', AlertTypes.warning);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'DeleteCompanyError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @computed get info() {
    return {
      total: this.companies.length,
    };
  }
}

export default createContext(new CompanyStore());
