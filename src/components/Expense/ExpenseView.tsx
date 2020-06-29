import React, { useContext, useEffect } from 'react';
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

  const expenseStore = useContext(ExpenseStore);
  const { getExpense, expense } = expenseStore;

  useEffect(() => {
    getExpense(expenseId);
  }, []);

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
              <h2 style={{ textAlign: 'center' }}> {expense.title} </h2>

              {expense?.ExpenseReceipts?.length || 0 > 0 ? (
                <Carousel>
                  {expense?.ExpenseReceipts?.map((expenseReceipt: any) => (
                    <div>
                      <CardMedia
                        style={{ height: '140px' }}
                        image={expenseReceipt.receipt}
                      />
                      <IconButton
                        aria-label='Delete'
                        style={{ float: 'right' }}
                        onClick={() => console.log(expenseReceipt.id)}
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
              <Button
                variant='contained'
                color='primary'
                style={{ float: 'right' }}
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
            </CardActions>
            {/* <CardActions disableSpacing>
              <IconButton aria-label='View'>
                <VisibilityIcon />
              </IconButton>
              {expense.status === 'Pending' ? (
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

              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label='show more'
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions> */}
            {/* <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>Description:</Typography>
                <Typography paragraph>{expense.description}</Typography>
                {expense?.ExpenseReceipts?.length || 0 > 0 ? (
                  <Carousel>
                    {expense?.ExpenseReceipts?.map((expenseReceipt: any) => (
                      <CardMedia
                        style={{ height: '140px' }}
                        image={expenseReceipt.receipt}
                      />
                    ))}
                  </Carousel>
                ) : null}
              </CardContent>
            </Collapse> */}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(ExpenseView);
