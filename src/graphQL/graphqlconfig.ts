import { GraphQLClient } from 'graphql-request';

export function setHeaders() {
  const endpoint = 'http://192.168.1.15:4000/';

  const graphQLClient: any = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ` + localStorage.getItem('token'),
    },
  });

  return graphQLClient;
}
