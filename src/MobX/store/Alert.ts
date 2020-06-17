import { v4 as uuid } from 'uuid';
import { AlertTypes } from '../../models/Alert';

export async function getAlert(msg: string, title: string, type: AlertTypes) {
  const id = uuid();

  const alert = {
    id,
    msg: `An Error has occured: ${title} : ${msg}`,
    type,
    title,
  };

  return alert;
}
