import { GraphQLClient } from 'graphql-request';

export const endpoint = 'http://localhost:4000/';

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ` + localStorage.getItem('token'),
  },
});
