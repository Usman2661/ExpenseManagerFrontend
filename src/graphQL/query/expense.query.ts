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
