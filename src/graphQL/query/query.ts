import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  query allUsers {
    allUsers {
      id
      name
      email
      department
      userType
      jobTitle
    }
  }
`;

export const GET_USER = gql`
  query user($id: Int!) {
    allUsers(id: $id) {
      id
      name
      email
      department
      userType
      jobTitle
    }
  }
`;
