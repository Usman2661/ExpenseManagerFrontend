export const ME = `
  query me {
      me{
    id,
    name,
    email,
    jobTitle,
    userType,
    department
    Company{
      id, 
      name,
      addressFirstLine,
      addressSecondLine,
      addressThirdLine
      CompanyConfig{
        logo, 
        appBarColor,
        companyId
      }
    }
    Manager{ 
    id, 
    name
    email
    jobTitle
    }
    Expenses{
      id, 
      title, 
      description,
      amount, 
      status, 
      type,
      createdAt,
      updatedAt,
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
    createdAt,
    updatedAt,
    User{
      id,
      name,
      jobTitle, 
      department,
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
      createdAt,
      updatedAt,
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

export const SENIOR_EXPENSE = `
  query seniorExpenses {
    seniorExpenses{
      id, 
      title, 
      amount,
      description, 
      status,
      type, 
    createdAt
      User{ 
      id, 
      name, 
      jobTitle,
      department
      email,
      }
      ExpenseReceipts{
        id, 
        expenseId, 
        receipt
      }
    }
  }
`;
