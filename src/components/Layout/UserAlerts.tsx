import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AlertStore from '../../MobX/store/AlertStore';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { IAlert } from '../../models/Alert';

function UserAlerts() {
  const { alerts } = AlertStore;
  return (
    <div>
      <Grid
        className='alertContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
      >
        <Grid item xs={12} sm={6}>
          {alerts.length > 0
            ? alerts.map((alert: IAlert) => (
                <Alert
                  variant='filled'
                  severity={alert.type}
                  className={`alertMessage${alert.title}${alert.type}`}
                  style={{ marginTop: '2%' }}
                >
                  {alert.msg}
                </Alert>
              ))
            : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(UserAlerts);
