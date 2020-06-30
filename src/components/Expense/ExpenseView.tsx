import React, { useContext, useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import CountUp from 'react-countup';
import Carousel from 'react-material-ui-carousel';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import { ExpenseStatus } from '../../models/Expense';
import CommuteIcon from '@material-ui/icons/Commute';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HotelIcon from '@material-ui/icons/Hotel';
import HelpIcon from '@material-ui/icons/Help';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import { observer } from 'mobx-react-lite';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Alert from '@material-ui/lab/Alert';
import { AlertTypes } from '../../models/Alert';
import ExpenseStore from '../../MobX/store/ExpenseStore';

const useStyles = makeStyles((theme: Theme) => ({
  typeIcon: {
    fontSize: 70,
    float: 'left',
    marginTop: '-5%',
    color: 'blue',
  },
}));

export interface IDialogState {
  id?: number;
  open: boolean;
  title?: String;
  deleteExpenseOrReceipt?: String;
}

function ExpenseView() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    history.push('/home');
  }
  const expenseId = parseInt(id || '0');

  const [dialogData, setDialogData] = useState<IDialogState>({
    open: false,
  });

  const expenseStore = useContext(ExpenseStore);
  const {
    getExpense,
    expense,
    deleteExpenseReceipt,
    deleteExpense,
  } = expenseStore;

  useEffect(() => {
    getExpense(expenseId);
  }, []);

  const handleClose = () => {
    setDialogData({
      ...dialogData,
      open: false,
      id: undefined,
      title: undefined,
      deleteExpenseOrReceipt: undefined,
    });
  };

  const ondeleteExpenseConfirm = async () => {
    await deleteExpense(expenseId);
    history.push('/home');
  };

  const ondeleteExpenseReceiptConfirm = async () => {
    await deleteExpenseReceipt(dialogData.id || 0);
    await getExpense(expenseId);

    setDialogData({
      ...dialogData,
      open: false,
      id: undefined,
      title: undefined,
      deleteExpenseOrReceipt: undefined,
    });
  };

  const setAlertType = (status: ExpenseStatus) => {
    const statusAlert = [
      {
        status: ExpenseStatus.Pending,
        alert: AlertTypes.warning,
      },
      {
        status: ExpenseStatus.Approved,
        alert: AlertTypes.success,
      },
      {
        status: ExpenseStatus.Rejected,
        alert: AlertTypes.error,
      },
    ];

    let myAlert = statusAlert.find((alert) => alert.status === status);

    return myAlert?.alert || AlertTypes.info;
  };

  const setExpenseIcon = (expenseType: String) => {
    const expenseTypeIcons = [
      {
        type: 'Food',
        icon: <FastfoodIcon className={classes.typeIcon} />,
      },
      {
        type: 'Transport',
        icon: <CommuteIcon className={classes.typeIcon} />,
      },
      {
        type: 'Accomodation',
        icon: <HotelIcon className={classes.typeIcon} />,
      },
      {
        type: 'Training',
        icon: <MenuBookIcon className={classes.typeIcon} />,
      },
      {
        type: 'Equipment',
        icon: <DevicesOtherIcon className={classes.typeIcon} />,
      },
      {
        type: 'Other',
        icon: <HelpIcon className={classes.typeIcon} />,
      },
    ];

    let expenseIcon = expenseTypeIcons.find(
      (expenseIcon) => expenseIcon.type === expenseType
    );
    return expenseIcon?.icon;
  };
  return (
    <div>
      <Grid
        className='expenseCardContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={8} md={8} lg={6}>
          <Card className='expenseCard' style={{ marginTop: '2%' }}>
            <CardContent>
              <h1 style={{ textAlign: 'center' }}> {expense.title} </h1>

              {expense?.ExpenseReceipts?.length || 0 > 0 ? (
                <Carousel
                  autoPlay={false}
                  indicators={true}
                  navButtonsAlwaysVisible={true}
                  animation='slide'
                >
                  {expense?.ExpenseReceipts?.map((expenseReceipt: any) => (
                    <div>
                      <CardMedia
                        style={{ height: '140px' }}
                        image={expenseReceipt.receipt}
                      />
                      <IconButton
                        disabled={expense.status !== 'Approved' ? false : true}
                        aria-label='Delete'
                        style={{ float: 'right' }}
                        onClick={() =>
                          setDialogData({
                            ...dialogData,
                            open: true,
                            id: expenseReceipt.id,
                            title: undefined,
                            deleteExpenseOrReceipt: 'Receipt',
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ))}
                </Carousel>
              ) : null}
              <Grid className='expenseCardContent' container direction='row'>
                <Grid item xs={6}>
                  <h3 style={{ textAlign: 'left' }}> {expense.type}</h3>
                  {setExpenseIcon(expense.type)}
                </Grid>

                <Grid item xs={6}>
                  {expense.amount ? (
                    <h3 style={{ textAlign: 'right' }}>
                      £ <CountUp decimals={2} end={expense.amount} />
                    </h3>
                  ) : null}
                  <Alert
                    variant='filled'
                    severity={setAlertType(expense.status)}
                    style={{ float: 'right', marginTop: '-5%' }}
                  >
                    {expense.status}
                  </Alert>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              {expense.status !== 'Approved' ? (
                <div>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ float: 'right' }}
                    onClick={() =>
                      setDialogData({
                        ...dialogData,
                        open: true,
                        id: expense.id,
                        title: expense.title,
                        deleteExpenseOrReceipt: 'Expense',
                      })
                    }
                  >
                    Delete
                  </Button>
                  <Button
                    variant='contained'
                    color='primary'
                    style={{ float: 'right' }}
                  >
                    Edit
                  </Button>
                </div>
              ) : null}
            </CardActions>
            {/* <CardActions disableSpacing>
              <IconButton aria-label='View'>
                <VisibilityIcon />
              </IconButton>
              {expense.status !== 'Approved' ? (
                <IconButton
                  aria-label='Delete'
                  onClick={() =>
                    setDialogData({
                      ...dialogData,
                      open: true,
                      id: expense.id,
                      title: expense.title,
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </CardActions> */}
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={dialogData.open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Delete {dialogData.title}{' '}
          {dialogData.deleteExpenseOrReceipt === 'Expense'
            ? 'Expense'
            : 'Expense Receipt'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete {dialogData.title}{' '}
            {dialogData.deleteExpenseOrReceipt === 'Expense'
              ? 'expense'
              : 'expense receipt'}{' '}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button
            onClick={
              dialogData.deleteExpenseOrReceipt === 'Expense'
                ? ondeleteExpenseConfirm
                : ondeleteExpenseReceiptConfirm
            }
            color='primary'
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(ExpenseView);
