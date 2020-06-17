import { IUser } from './User';

export interface IExpense {
  id?: number;
  title: String;
  description?: String;
  type: String;
  amount: number;
  status: boolean;
  date?: String;
  recipt?: String;
  user?: IUser;
}
