import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $jobTitle: String!
    $department: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      jobTitle: $jobTitle
      department: $department
    ) {
      id
      name
      email
      department
      jobTitle
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        department
        userType
        jobTitle
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// export const UPDATE_USER = gql`
//   mutation updateUser(
//     $id: Int!
//     $name: String!
//     $email: String!
//     $password: String!
//     $jobTitle: String!
//     $department: String!
//   ) {
//     updateUser(
//       id: $id
//       name: $name
//       email: $email
//       password: $password
//       jobTitle: $jobTitle
//       department: $department
//     ) {
//       id
//       name
//       email
//       department
//       jobTitle
//       userType
//     }
//   }
// `;

export const UPDATE_USER = `
  mutation updateUser(
    $id: Int!
    $name: String!
    $email: String!
    $jobTitle: String!
    $department: String!
    $userType: String!
    $managerId: Int
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      jobTitle: $jobTitle
      department: $department
      userType: $userType
      managerId: $managerId
    ) {
      id
      name
      email
      department
      jobTitle
      userType
    }
  }
`;
