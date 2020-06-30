import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { setHeaders } from '../../graphQL/graphqlconfig';
import AlertStore from './AlertStore';
import { AlertTypes } from '../../models/Alert';
import { getAlert } from './Alert';
import { IExpense } from '../../models/Expense';
import { ME, GET_EXPENSE } from '../../graphQL/query/expense.query';
import alasql from 'alasql';
import { DELETE_EXPENSERECEIPT } from '../../graphQL/mutation/expense.mutation';
import { IExpenseReceipts } from '../../models/ExpenseReciepts';
import {
  CREATE_EXPENSE,
  DELETE_EXPENSE,
} from '../../graphQL/mutation/expense.mutation';

class ExpenseStore {
  constructor() {
    reaction(
      () => this.expenses,
      (_) => this.expenses.length
    );
  }

  @observable expenses: IExpense[] = [];
  @observable expense: any = {};
  @observable expensesLoaded: boolean = false;

  @action getExpenses = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(ME);
      this.expenses = data.me.Expenses;
      this.expensesLoaded = true;
    } catch (error) {
      console.error(error);
      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchExpensesError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action getExpense = async (id: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: id,
      };
      const data = await graphQLClient.request(GET_EXPENSE, variables);
      this.expense = data.expense;

      return data.expense;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchExpenseError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action createExpense = async (expense: IExpense) => {
    try {
      const graphQLClient = setHeaders();

      const variables = {
        title: expense.title,
        description: expense.description,
        amount: expense.amount,
        type: expense.type,
      };
      const data = await graphQLClient.request(CREATE_EXPENSE, variables);

      this.expenses = [data.createExpense, ...this.expenses];

      return data.createExpense;
    } catch (error) {
      console.error(error);

      //Error Alert
      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'CreateExpenseError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action deleteExpense = async (id?: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id,
      };
      const data = await graphQLClient.request(DELETE_EXPENSE, variables);
      this.expenses = this.expenses.filter(
        (expense) => expense.id !== data.deleteExpense.id
      );

      const msg = `Expense deleted succesfully`;
      const alert = await getAlert(msg, '', AlertTypes.warning);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'DeleteExpenseError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action deleteExpenseReceipt = async (id: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id,
      };
      const data = await graphQLClient.request(
        DELETE_EXPENSERECEIPT,
        variables
      );
      // this.expense = this.expense.ExpenseReceipts.filter(
      //   (expenseReceipt: IExpenseReceipts) =>
      //     expenseReceipt.id !== data.deleteExpenseReceipt.id
      // );

      const msg = `Expense Receipt Removed!!`;
      const alert = await getAlert(msg, '', AlertTypes.warning);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(
        msg,
        'DeleteExpenseReceiptError',
        AlertTypes.error
      );
      AlertStore.setAlert(alert);
    }
  };

  @computed get info() {
    const claimApproved = alasql(
      'SELECT SUM(amount) AS totalClaimed FROM ? Where status="Approved"',
      [this.expenses]
    );

    const claimPending = alasql(
      'SELECT SUM(amount) AS totalPending FROM ? Where status="Pending"',
      [this.expenses]
    );

    const totalClaimed: number = claimApproved[0].totalClaimed;
    const totalPending: number = claimPending[0].totalPending;

    return {
      total: this.expenses.length,
      approved: this.expenses.filter((expense) => expense.status === 'Approved')
        .length,
      notApproved: this.expenses.filter(
        (expense) => expense.status !== 'Approved'
      ).length,
      totalClaimed,
      totalPending,
    };
  }
}

export default createContext(new ExpenseStore());
