import { GraphQLClient } from 'graphql-request';

const token = localStorage.getItem('token');

export const endpoint = 'http://localhost:4000/';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: token ? `Bearer ${token}` : '',
  },
});
