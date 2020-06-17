import { IExpense } from './Expense';
export interface IUser {
  id?: number;
  name: String;
  email: String;
  password?: String;
  jobTitle: String;
  userType?: String;
  department: String;
  managerId?: number;
  Expenses?: IExpense[];
}
