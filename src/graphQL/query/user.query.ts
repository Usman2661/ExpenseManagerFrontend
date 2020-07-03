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
      companyId
      Company{
        name
      }
    }
  }
`;

export const GET_USER = `query user($id: Int!) {
  user(id: $id) {
    id
    name
    email
    department
    userType
    jobTitle
    managerId
    companyId
  }
}`;

export const MANAGER_USERS = `
query managerUsers {
  managerUsers {
    id
    name
    email
    department
    userType
    jobTitle
    managerId
    companyId
  }
}`;
