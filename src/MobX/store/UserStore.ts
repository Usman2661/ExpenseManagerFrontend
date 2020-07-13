import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { IUser } from '../../models/User';
import { v4 as uuid } from 'uuid';
import {
  GET_USERS,
  GET_USER,
  MANAGER_USERS,
} from '../../graphQL/query/user.query';
import { setHeaders } from '../../graphQL/graphqlconfig';
import { LOGIN_USER } from '../../graphQL/mutation/user.mutation';
import {
  DELETE_USER,
  UPDATE_USER,
  CREATE_USER,
} from '../../graphQL/mutation/user.mutation';
import AlertStore from './AlertStore';
import { AlertTypes } from '../../models/Alert';
import { getAlert } from './Alert';

class UserStore {
  constructor() {
    reaction(
      () => this.users,
      (_) => this.users.length
    );
  }

  @observable users: IUser[] = [];
  @observable user: any = {};
  @observable usersLoaded: boolean = false;
  @observable managerUsers: IUser[] = [];

  @action createUser = async (user: IUser) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        name: user.name,
        email: user.email,
        department: user.department,
        userType: user.userType,
        password: user.password,
        jobTitle: user.jobTitle,
        managerId: user.managerId,
        companyId: user.companyId,
      };
      const data = await graphQLClient.request(CREATE_USER, variables);

      this.users = [data.createUser, ...this.users];

      const msg = `Profile Succesfully Created for ${data.createUser.name}`;
      const alert = await getAlert(msg, '', AlertTypes.success);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'CreateUserError', AlertTypes.error);
      AlertStore.setAlert(alert);
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

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchUserError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action getUsers = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(GET_USERS);
      this.users = data.allUsers;
      this.usersLoaded = true;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'FetchUsersError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @action getManagerUsers = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(MANAGER_USERS);
      this.managerUsers = data.managerUsers;
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(
        msg,
        'FetchManagerUserError',
        AlertTypes.error
      );
      AlertStore.setAlert(alert);
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
        companyId: user.companyId,
      };
      const data = await graphQLClient.request(UPDATE_USER, variables);

      this.users = this.users.map((user: IUser) => {
        if (user.id === data.updateUser.id) {
          return data.updateUser;
        }
        return user;
      });

      const msg = `Profile Updated for ${data.updateUser.name}`;
      const alert = await getAlert(msg, '', AlertTypes.success);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'UpdateUserError', AlertTypes.error);
      AlertStore.setAlert(alert);
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

      const msg = `User deleted succesfully`;
      const alert = await getAlert(msg, '', AlertTypes.warning);
      AlertStore.setAlert(alert);
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'DeleteUserError', AlertTypes.error);
      AlertStore.setAlert(alert);
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
        localStorage.setItem('managerId', data.login.user.managerId);
        localStorage.setItem('companyName', data.login.user?.Company?.name);
        localStorage.setItem('width', '240');

        return data.login;
      }
    } catch (error) {
      console.error(error);

      const msg = error.message.split(':')[0];
      const alert = await getAlert(msg, 'LoginError', AlertTypes.error);
      AlertStore.setAlert(alert);
    }
  };

  @computed get infoUser() {
    return {
      total: this.users.length,
      approved: this.users.filter((user) => user.managerId).length,
      notApproved: this.users.filter((user) => !user.managerId).length,
      managerUsersTotal: this.managerUsers.length,
    };
  }
}

export default createContext(new UserStore());
