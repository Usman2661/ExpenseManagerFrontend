export interface IAlert {
  id?: string;
  msg: string;
  type: AlertTypes;
  title: string;
}

export enum AlertTypes {
  error = 'error',
  info = 'info',
  success = 'success',
  warning = 'warning',
}
