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

export const DELETE_EXPENSE = `
  mutation deleteExpense($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`;
