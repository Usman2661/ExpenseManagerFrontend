import { v4 as uuid } from 'uuid';
import { AlertTypes } from '../../models/Alert';

export async function getAlert(msg: string, title: string, type: AlertTypes) {
  const id = uuid();
  let alert;

  if (type === AlertTypes.error) {
    alert = {
      id,
      msg: `An Error has occured: ${title} : ${msg}`,
      type,
      title,
    };
  } else {
    alert = {
      id,
      msg: `${title}  ${msg}`,
      type,
      title,
    };
  }

  return alert;
}
