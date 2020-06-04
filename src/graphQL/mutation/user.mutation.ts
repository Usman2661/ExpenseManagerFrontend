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
