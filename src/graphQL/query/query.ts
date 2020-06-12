import { gql } from 'apollo-boost';

// export const GET_USERS = gql`
//   query allUsers {
//     allUsers {
//       id
//       name
//       email
//       department
//       userType
//       jobTitle
//     }
//   }
// `;

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

// export const GET_USER = gql`
//   query user($id: Int!) {
//     user(id: $id) {
//       id
//       name
//       email
//       department
//       userType
//       jobTitle
//     }
//   }
// `;

export const GET_USER = `query user($id: Int!) {
  user(id: $id) {
    id
    name
    email
    department
    userType
    jobTitle
    managerId
  }
}`;
