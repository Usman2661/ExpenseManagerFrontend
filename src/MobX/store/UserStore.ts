import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { IUser } from '../../models/User';
import { GET_USERS, GET_USER } from '../../graphQL/query/query';
import { setHeaders } from '../../graphQL/graphqlconfig';
import { LOGIN_USER } from '../../graphQL/mutation/user.mutation';
import {
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
} from '../../graphQL/mutation/user.mutation';

class UserStore {
  constructor() {
    reaction(
      () => this.users,
      (_) => this.users.length
    );
  }

  @observable users: IUser[] = [];
  @observable user: any = {};
  @observable usersLoading: boolean = false;

  @action createUser = async (user: IUser) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        name: user.name,
        email: user.email,
        department: user.department,
        password: user.password,
        jobTitle: user.jobTitle,
      };
      const data = await graphQLClient.request(CREATE_USER, variables);

      this.users = [data.createUser, ...this.users];
    } catch (error) {
      console.error(error);
    }
  };

  @action getUser = async (id: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: id,
      };
      const data = await graphQLClient.request(GET_USER, variables);
      this.user = data.user;

      return data.user;
    } catch (error) {
      console.error(error);
    }
  };

  @action getUsers = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(GET_USERS);
      this.users = data.allUsers;
      this.usersLoading = true;
    } catch (error) {
      console.error(error);
    }
  };

  @action updateUser = async (user: IUser) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: user.id,
        name: user.name,
        email: user.email,
        department: user.department,
        jobTitle: user.jobTitle,
        userType: user.userType,
        managerId: user.managerId,
      };
      const data = await graphQLClient.request(UPDATE_USER, variables);

      this.users = this.users.map((user) => {
        if (user.id === data.updateUser.id) {
          return data.updateUser;
        }
        return user;
      });
    } catch (error) {
      console.error(error);
    }
  };

  @action deleteUser = async (id?: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id,
      };
      const data = await graphQLClient.request(DELETE_USER, variables);
      this.users = this.users.filter((user) => user.id !== data.deleteUser.id);
    } catch (error) {
      console.error(error);
    }
  };

  @action login = async (email: string, password: string) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        email,
        password,
      };
      const data = await graphQLClient.request(LOGIN_USER, variables);

      if (data.login.token) {
        localStorage.setItem('id', data.login.user.id);
        localStorage.setItem('auth', 'true');
        localStorage.setItem('name', data.login.user.name);
        localStorage.setItem('email', data.login.user.email);
        localStorage.setItem('userType', data.login.user.userType);
        localStorage.setItem('token', data.login.token);

        return data.login;
      }
    } catch (error) {
      console.error(error);
    }
  };

  @computed get info() {
    return {
      total: this.users.length,
      approved: this.users.filter((user) => user.managerId).length,
      notApproved: this.users.filter((user) => !user.managerId).length,
    };
  }
}

export default createContext(new UserStore());
