import { IUser } from './User';
import { IExpenseReceipts } from './ExpenseReciepts';

export interface IExpense {
  id?: number;
  title: String;
  description?: String;
  type: String;
  amount: number;
  status: ExpenseStatus;
  createdAt?: String;
  updatedAt?: String;
  User?: IUser;
  ExpenseReceipts?: IExpenseReceipts[];
}

export enum ExpenseStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}
