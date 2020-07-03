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

export const GET_EXPENSE = `query expense($id: Int!) {
  expense(id: $id) {
    id, 
    title, 
    description,
    amount, 
    type,
    status, 
    User{
      id,
      name,
      managerId
    }
    ExpenseReceipts{
      id,
      receipt
    }
  }
}`;

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

export const MANAGER_EXPENSE = `
  query managerExpenses {
    managerExpenses {
      id, 
      title, 
      amount,
      description, 
      status,
      type, 
      User{ 
      id, 
      name, 
      jobTitle,
      department,
      email,
      }
      ExpenseReceipts{
        id, 
        expenseId, 
        receipt,
      }
    }
  }
`;
