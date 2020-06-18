export interface ICompany {
  id?: number;
  name: String;
  addressFirstLine: String;
  addressSecondLine?: String;
  addressThirdLine?: String;
  postcode: String;
  phone: number;
  businessArea: String;
  registerYear: number;
}
