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
import { IDialogState, ExpenseModalDataState } from '../Home/Staff/ExpenseList';
import ExpenseModal from './ExpenseModal';
import { UserContext } from '../../userContext';

const useStyles = makeStyles((theme: Theme) => ({
  typeIcon: {
    fontSize: 70,
    float: 'left',
    marginTop: '-5%',
    color: 'blue',
  },
}));

function ExpenseView() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    history.push('/home');
  }
  const expenseId = parseInt(id || '0');

  const [dialogData, setDialogData] = useState<IDialogState>({
    open: false,
  });

  const [expenseModalData, setExpenseModalData] = useState<
    ExpenseModalDataState
  >({
    showExpenseModal: false,
    editExpense: false,
  });

  const { showExpenseModal, editExpense } = expenseModalData;

  const expenseStore = useContext(ExpenseStore);
  const {
    getExpense,
    expense,
    deleteExpenseReceipt,
    deleteExpense,
    updateExpense,
  } = expenseStore;

  useEffect(() => {
    if (expenseId !== 0) {
      retrieveExpense();
    }
  }, []);

  const retrieveExpense = async () => {
    const myExpense = await getExpense(expenseId);

    if (myExpense?.User?.id) {
      if (
        parseInt(myExpense?.User?.id) != parseInt(userAuthData.id) &&
        parseInt(myExpense?.User?.managerId) != parseInt(userAuthData.id)
      ) {
        history.push('/home');
      }
    }
  };

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

    handleClose();
  };

  const onApproveExpenseConfirm = async () => {
    const expenseData = {
      id: expense?.id,
      title: expense.title,
      description: expense?.description,
      type: expense.type,
      amount: expense.amount,
      status: ExpenseStatus.Approved,
    };

    const updatedExpense = await updateExpense(expenseData);

    if (updatedExpense.id) {
      await getExpense(updatedExpense.id);
      await handleClose();
    }
  };

  const onRejectExpenseConfirm = async () => {
    const expenseData = {
      id: expense?.id,
      title: expense.title,
      description: expense?.description,
      type: expense.type,
      amount: expense.amount,
      status: ExpenseStatus.Rejected,
    };
    const updatedExpense = await updateExpense(expenseData);

    if (updatedExpense.id) {
      await getExpense(updatedExpense.id);
      await handleClose();
    }
  };

  const closeExpenseModal = () => {
    setExpenseModalData({
      ...expenseModalData,
      editExpense: false,
      showExpenseModal: false,
    });
  };

  const onEditExpense = async () => {
    setExpenseModalData({
      ...expenseModalData,
      editExpense: true,
      showExpenseModal: true,
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
      {showExpenseModal ? (
        <ExpenseModal
          expense={expense}
          edit={expenseModalData.editExpense}
          onCancel={closeExpenseModal}
        />
      ) : null}

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
                        style={{ height: 'auto', width: 'auto' }}
                        image={expenseReceipt.receipt}
                      />

                      {expense?.User?.id == userAuthData.id ? (
                        <IconButton
                          disabled={
                            expense.status !== 'Approved' ? false : true
                          }
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
                      ) : null}
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
              {expense.status !== 'Approved' &&
              expense?.User?.id == userAuthData.id ? (
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
                    onClick={onEditExpense}
                  >
                    Edit
                  </Button>
                </div>
              ) : null}

              {expense?.User?.managerId == userAuthData.id ? (
                <div>
                  <Button
                    onClick={() =>
                      setDialogData({
                        ...dialogData,
                        open: true,
                        title: expense.title,
                        deleteExpenseOrReceipt: 'Approve',
                      })
                    }
                  >
                    {' '}
                    Approve Expense
                  </Button>
                  <Button
                    onClick={() =>
                      setDialogData({
                        ...dialogData,
                        open: true,
                        title: expense.title,
                        deleteExpenseOrReceipt: 'Reject',
                      })
                    }
                  >
                    {' '}
                    Reject Expense
                  </Button>
                </div>
              ) : null}
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Dialog
        open={dialogData.open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {dialogData.deleteExpenseOrReceipt === 'Expense' ||
        dialogData.deleteExpenseOrReceipt === 'Receipt' ? (
          <div>
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
          </div>
        ) : (
          <div>
            <DialogTitle id='alert-dialog-title'>
              {dialogData.deleteExpenseOrReceipt} Expense {dialogData.title}
              {/* Delete {dialogData.title}{' '}
              {dialogData.deleteExpenseOrReceipt === 'Expense'
                ? 'Expense'
                : 'Expense Receipt'} */}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Are you sure you want to
                {dialogData.deleteExpenseOrReceipt === 'Approve'
                  ? ' approve expense '
                  : ' reject expense '}{' '}
                {dialogData.title} {' ?'}
              </DialogContentText>
            </DialogContent>
          </div>
        )}

        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          {dialogData.deleteExpenseOrReceipt === 'Expense' ||
          dialogData.deleteExpenseOrReceipt === 'Receipt' ? (
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
          ) : (
            <Button
              onClick={
                dialogData.deleteExpenseOrReceipt === 'Approve'
                  ? onApproveExpenseConfirm
                  : onRejectExpenseConfirm
              }
              color='primary'
              autoFocus
            >
              Yes
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(ExpenseView);
