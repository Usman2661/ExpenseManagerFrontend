import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { IUser } from '../../models/User';
import { GET_USERS, GET_USER } from '../../graphQL/query/query';
import { setHeaders } from '../../graphQL/graphqlconfig';
import { DELETE_USER } from '../../graphQL/mutation/user.mutation';

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

  @action addUser = async (user: IUser) => {
    // this.todos.push({ ...todo, id: 111 });
  };

  @action getUser = async (id: number) => {
    try {
      const graphQLClient = setHeaders();
      const variables = {
        id: id,
      };
      const data = await graphQLClient.request(GET_USER, variables);
      this.user = data.user;
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

  @action updateUser = (id: number) => {
    // this.todos = this.todos.map((todo) => {
    //   if (todo.id === id) {
    //     return {
    //       ...todo,
    //       completed: !todo.completed,
    //     };
    //   }
    //   return todo;
    // });
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

  @computed get info() {
    return {
      total: this.users.length,
      approved: this.users.filter((user) => user.managerId).length,
      notApproved: this.users.filter((user) => !user.managerId).length,
    };
  }
}

export default createContext(new UserStore());
