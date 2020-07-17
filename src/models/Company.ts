import { ICompanyConfig } from './CompanyConfig';
export interface ICompany {
  id?: number;
  name: String;
  addressFirstLine: String;
  addressSecondLine?: String;
  addressThirdLine?: String;
  postcode: String;
  phone: String;
  businessArea: String;
  registerYear: number;
  CompanyConfig?: ICompanyConfig;
}
