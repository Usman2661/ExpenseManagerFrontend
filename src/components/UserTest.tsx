import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { IUser } from '../models/User';

interface UserData {
  allUsers: IUser[];
}

interface UserDataVars {}

const GET_MY_USERS = gql`
  query allUsers {
    allUsers {
      id
      name
      email
      jobTitle
    }
  }
`;

const isAuthenticated = gql`
  query getAuthenticated {
    authenticated @client
  }
`;

export function UserTest() {
  const { loading, data } = useQuery<any, any>(isAuthenticated, {});
  console.log(data);

  return (
    <div>
      {/* <h3>Available Inventory</h3>
      {loading ? (
        <p>Loading ...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Model</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.allUsers.map((user) => (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}
