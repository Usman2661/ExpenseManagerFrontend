import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import AlertStore from '../../MobX/store/AlertStore';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import { IAlert } from '../../models/Alert';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

export interface State extends SnackbarOrigin {}

function UserAlerts() {
  const [state, setState] = React.useState<State>({
    vertical: 'top',
    horizontal: 'center',
  });

  const { vertical, horizontal } = state;

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
                <Snackbar
                  open={true}
                  anchorOrigin={{ vertical, horizontal }}
                  style={{ marginTop: '3%' }}
                >
                  <Alert
                    variant='filled'
                    severity={alert.type}
                    className={`alertMessage${alert.title}${alert.type}`}
                    style={{ marginTop: '2%' }}
                  >
                    {alert.msg}
                  </Alert>
                </Snackbar>
              ))
            : null}
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(UserAlerts);
