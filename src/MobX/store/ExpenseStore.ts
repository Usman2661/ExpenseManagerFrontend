import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { setHeaders } from '../../graphQL/graphqlconfig';
import AlertStore from './AlertStore';
import { AlertTypes } from '../../models/Alert';
import { getAlert } from './Alert';
import { IExpense } from '../../models/Expense';
import { ME } from '../../graphQL/query/expense.query';
import alasql from 'alasql';

class ExpenseStore {
  constructor() {
    reaction(
      () => this.expenses,
      (_) => this.expenses.length
    );
  }

  @observable expenses: IExpense[] = [];
  @observable expensesLoading: boolean = true;

  @action getExpenses = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(ME);
      this.expenses = data.me.Expenses;
      this.expensesLoading = false;
    } catch (error) {
      console.error(error);
      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchExpensesError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @computed get info() {
    const claimApproved = alasql(
      'SELECT SUM(amount) AS totalClaimed FROM ? Where status=true',
      [this.expenses]
    );

    const claimPending = alasql(
      'SELECT SUM(amount) AS totalPending FROM ? Where status=false',
      [this.expenses]
    );

    const totalClaimed: number = claimApproved[0].totalClaimed;
    const totalPending: number = claimPending[0].totalPending;

    return {
      total: this.expenses.length,
      approved: this.expenses.filter((expense) => expense.status).length,
      notApproved: this.expenses.filter((expense) => !expense.status).length,
      totalClaimed,
      totalPending,
    };
  }
}

export default createContext(new ExpenseStore());
