import { gql } from 'apollo-boost';

export const GET_USERS = gql`
  query allUsers {
    id
    name
    email
    department
    userType
    jobTitle
  }
`;
