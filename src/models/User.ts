import { IExpense } from './Expense';
import { ICompany } from './Company';
export interface IUser {
  id?: number;
  name: String;
  email: String;
  password?: String;
  jobTitle: String;
  userType?: String;
  department: String;
  managerId?: number;
  companyId?: number;
  Expenses?: IExpense[];
  Company?: ICompany;
  Manager?: IUser;
}
