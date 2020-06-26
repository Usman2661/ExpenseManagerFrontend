export const ME = `
  query me {
      me{
    id,
    name,
    email,
    jobTitle
    Expenses{
      id, 
      title, 
      description,
      amount, 
      status, 
      type
      ExpenseReceipts{
        id, 
        expenseId, 
        receipt
      }
    }
}
  }
`;

export const GET_USERS = `
  query allUsers {
    allUsers {
      id
      name
      email
      department
      userType
      jobTitle
      managerId
    }
  }
`;
