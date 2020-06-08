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
