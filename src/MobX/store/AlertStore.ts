import { observable, action, computed, reaction } from 'mobx';
import { createContext } from 'react';
import { IAlert } from '../../models/Alert';

class AlertStore {
  constructor() {
    reaction(
      () => this.alerts,
      (_) => this.alerts.length
    );
  }

  @observable alerts: IAlert[] = [];

  @action setAlert = async (alert: IAlert) => {
    try {
      this.alerts = [alert, ...this.alerts];

      setTimeout(() => {
        this.removeAlert(alert.id);
      }, 5000);
    } catch (error) {
      console.error(error);
    }
  };

  @action removeAlert = async (id?: string) => {
    try {
      this.alerts = this.alerts.filter((alert) => alert.id !== id);
    } catch (error) {
      console.error(error);
    }
  };

  @computed get info() {
    return {
      total: this.alerts.length,
    };
  }
}

export default new AlertStore();
