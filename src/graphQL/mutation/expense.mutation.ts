import gql from 'graphql-tag';

export const CREATE_EXPENSE = `
  mutation createExpense(
    $title: String!
    $description: String
    $amount: Float!
    $type: String!
  ) {
    createExpense(
      title: $title
      description: $description
      amount: $amount
      type: $type
    ) {
      id
      title, 
      description, 
      type, 
      status, 
      amount
    }
  }
`;

export const UPDATE_EXPENSE = `
  mutation updateExpense(
    $id: Int!
    $title: String!
    $description: String
    $status: String
    $type: String!
    $amount: Float!
  ) {
    updateExpense(
      id: $id
      title: $title
      description: $description
      status: $status
      type: $type
      amount: $amount
    ) {
      id
      title
      description
      status
      type
      amount
    }
  }
`;

export const DELETE_EXPENSE = `
  mutation deleteExpense($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;

export const DELETE_EXPENSERECEIPT = `
  mutation deleteExpenseReceipt($id: Int!) {
    deleteExpenseReceipt(id: $id) {
      id
    }
  }
`;
