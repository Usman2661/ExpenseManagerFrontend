import gql from 'graphql-tag';

export const CREATE_USER = `
  mutation createUser(
    $name: String!
    $email: String!
    $password: String!
    $jobTitle: String!
    $department: String!
    $userType: String!
    $managerId: Int
    $companyId: Int
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      jobTitle: $jobTitle
      department: $department
      userType: $userType
      managerId: $managerId
      companyId: $companyId
    ) {
      id
      name
      email
      department
      jobTitle
      userType
      managerId
      companyId
    }
  }
`;

export const LOGIN_USER = `
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

export const DELETE_USER = `
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

export const UPDATE_USER = `
  mutation updateUser(
    $id: Int!
    $name: String!
    $email: String!
    $jobTitle: String!
    $department: String!
    $userType: String!
    $managerId: Int
    $companyId: Int
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      jobTitle: $jobTitle
      department: $department
      userType: $userType
      managerId: $managerId
      companyId: $companyId
    ) {
      id
      name
      email
      department
      jobTitle
      userType
      managerId
      companyId
    }
  }
`;
