import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { setHeaders } from '../../graphQL/graphqlconfig';
import AlertStore from './AlertStore';
import { AlertTypes } from '../../models/Alert';
import { getAlert } from './Alert';
import { IExpense } from '../../models/Expense';
import {
  ME,
  GET_EXPENSE,
  MANAGER_EXPENSE,
} from '../../graphQL/query/expense.query';
import alasql from 'alasql';
import {
  DELETE_EXPENSERECEIPT,
  UPDATE_EXPENSE,
} from '../../graphQL/mutation/expense.mutation';
import { IExpenseReceipts } from '../../models/ExpenseReciepts';
import { SENIOR_EXPENSE } from '../../graphQL/query/expense.query';
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

  @observable managerExpenses: IExpense[] = [];
  @observable seniorExpenses: IExpense[] = [];
  @observable expenses: IExpense[] = [];
  @observable expense: any = {};
  @observable expensesLoaded: boolean = false;
  @observable managerExpensesLoaded: boolean = false;
  @observable seniorExpensesLoaded: boolean = false;

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

  @action getManagerExpenses = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(MANAGER_EXPENSE);
      this.managerExpenses = data.managerExpenses;
      this.managerExpensesLoaded = true;
    } catch (error) {
      console.error(error);
      const msg = error.message.split(':')[0];
      const alert = await getAlert(
        msg,
        'FetchManagerExpenseError',
        AlertTypes.error
      );
      AlertStore.setAlert(alert);
    }
  };

  @action getSeniorExpenses = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(SENIOR_EXPENSE);
      this.seniorExpenses = data.seniorExpenses;
      this.seniorExpensesLoaded = true;
    } catch (error) {
      console.error(error);
      const msg = error.message.split(':')[0];
      const alert = await getAlert(
        msg,
        'FetchSeniorExpenseError',
        AlertTypes.error
      );
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

  @action updateExpense = async (expense: IExpense) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: expense.id,
        title: expense.title,
        description: expense.description,
        type: expense.type,
        amount: expense.amount,
        status: expense.status,
      };
      const data = await graphQLClient.request(UPDATE_EXPENSE, variables);

      this.expenses = this.expenses.map((expense: IExpense) => {
        if (expense.id === data.updateExpense.id) {
          return data.updateExpense;
        }
        return expense;
      });

      const msg = `Expense Details updated for ${data.updateExpense.title}`;
      const alert = await getAlert(msg, '', AlertTypes.success);
      AlertStore.setAlert(alert);

      return data.updateExpense;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'UpdateUserError', AlertTypes.error);
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

    const claimApprovedManager = alasql(
      'SELECT SUM(amount) AS totalClaimed FROM ? Where status="Approved"',
      [this.managerExpenses]
    );

    const claimPendingManager = alasql(
      'SELECT SUM(amount) AS totalPending FROM ? Where status="Pending"',
      [this.managerExpenses]
    );

    const totalApprovedManager: number = claimApprovedManager[0].totalClaimed;
    const totalPendingManager: number = claimPendingManager[0].totalPending;

    const ExpensesSenior = alasql('SELECT SUM(amount) AS totalAmount FROM ? ', [
      this.seniorExpenses,
    ]);

    const totalWithoutPendingSenior = alasql(
      'SELECT id,title,amount FROM ? Where status="Rejected" OR status="Approved"',
      [this.seniorExpenses]
    );

    let approveRateSenior: number = 0;

    const acceptRateSenior: number =
      (this.seniorExpenses.filter((expense) => expense.status === 'Approved')
        .length /
        totalWithoutPendingSenior.length) *
      100;

    if (acceptRateSenior > 0) {
      approveRateSenior = acceptRateSenior;
    }

    const totalExpensesSenior: number = ExpensesSenior[0].totalAmount;

    return {
      //User
      total: this.expenses.length,
      approved: this.expenses.filter((expense) => expense.status === 'Approved')
        .length,
      notApproved: this.expenses.filter(
        (expense) => expense.status !== 'Approved'
      ).length,
      totalClaimed,
      totalPending,
      // Manager
      pendingClaimsManager: this.managerExpenses.filter(
        (expense) => expense.status === 'Pending'
      ).length,
      totalApprovedManager,
      totalPendingManager,

      //SeniorManagement
      totalExpensesSenior,
      totalClaimsSenior: this.seniorExpenses.length,
      acceptRateSenior: approveRateSenior
    };
  }
}

export default createContext(new ExpenseStore());
