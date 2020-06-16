import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import axios from 'axios';
import { IUser } from '../../models/User';
import { GET_USER, GET_USERS } from '../../graphQL/query/query';
import { setHeaders } from '../../graphQL/graphqlconfig';

class UserStore {
  constructor() {
    reaction(
      () => this.users,
      (_) => this.users.length
    );
  }

  @observable users: IUser[] = [];

  @action addUser = async (user: IUser) => {
    // this.todos.push({ ...todo, id: 111 });
  };

  @action getUsers = async () => {
    try {
      const graphQLClient = setHeaders();
      const data = await graphQLClient.request(GET_USERS);
      this.users = data.allUsers;
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

  @action deleteUser = async (id: number) => {
    // try {
    //   //   const todo = await axios.delete(
    //   //     `https://jsonplaceholder.typicode.com/todos/${id}`
    //   //   );
    //   //   console.log(todo.data);
    //   this.todos = this.todos.filter((todo) => todo.id !== id);
    // } catch (error) {
    //   console.error(error);
    // }
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
