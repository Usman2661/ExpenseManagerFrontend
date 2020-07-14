import React, { useContext, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
// import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import VisibilityIcon from '@material-ui/icons/Visibility';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// Expense Types Icon
import CommuteIcon from '@material-ui/icons/Commute';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HotelIcon from '@material-ui/icons/Hotel';
import HelpIcon from '@material-ui/icons/Help';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { observer } from 'mobx-react-lite';
import { IExpense, ExpenseStatus } from '../../../models/Expense';
import ExpenseModal from '../../Expense/ExpenseModal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { AlertTypes } from '../../../models/Alert';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  typeIcon: {
    fontSize: 70,
    float: 'left',
    marginTop: '-5%',
    color: 'blue',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export interface ExpenseModalDataState {
  showExpenseModal: boolean;
  editExpense?: boolean;
  expense?: IExpense;
}
export interface IDialogState {
  id?: number;
  open: boolean;
  title?: String;
  deleteExpenseOrReceipt?: String;
}

function ExpenseList() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [value, setValue] = React.useState(0);
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
  const { getExpenses, expenses, deleteExpense } = expenseStore;

  useEffect(() => {
    getExpenses();
  }, []);

  const pendingExpenses = expenses.filter((expense: IExpense) => {
    return expense.status === 'Pending';
  });

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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

  const handleClose = () => {
    setDialogData({
      ...dialogData,
      open: false,
      id: undefined,
      title: undefined,
    });
  };

  const deleteExpenseConfirm = async () => {
    await deleteExpense(dialogData.id);
    setDialogData({
      ...dialogData,
      open: false,
      id: undefined,
      title: undefined,
    });
  };

  const closeExpenseModal = () => {
    setExpenseModalData({
      ...expenseModalData,
      editExpense: false,
      showExpenseModal: false,
    });
  };

  const onCreateExpense = async () => {
    setExpenseModalData({
      ...expenseModalData,
      editExpense: false,
      showExpenseModal: true,
    });
  };

  return (
    <div>
      {showExpenseModal ? <ExpenseModal onCancel={closeExpenseModal} /> : null}
      <Grid
        className='expensePanelContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <AppBar position='static' color='default'>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
              aria-label='full width tabs example'
            >
              <Tab label='Pending' {...a11yProps(0)} />
              <Tab label='All' {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid
                className='expenseCardContainer'
                container
                direction='row'
                justify='center'
                alignItems='center'
                style={{ margin: 0, width: '100%' }}
              >
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  {pendingExpenses.map((expense: IExpense) => (
                    <Card className='expenseCard' style={{ marginTop: '2%' }}>
                      <CardContent>
                        <h2 style={{ textAlign: 'center' }}>{expense.title}</h2>
                        <Grid
                          className='expenseCardContent'
                          container
                          direction='row'
                        >
                          <Grid item xs={6}>
                            <h3 style={{ textAlign: 'left' }}>
                              {expense.type}
                            </h3>
                            {setExpenseIcon(expense.type)}
                          </Grid>

                          <Grid item xs={6}>
                            <h3 style={{ textAlign: 'right' }}>
                              £ <CountUp decimals={2} end={expense.amount} />
                            </h3>

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
                      <CardActions disableSpacing>
                        <IconButton
                          aria-label='View'
                          onClick={() =>
                            history.push(`/expense?id=${expense.id}`)
                          }
                        >
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
                      </CardActions>
                      <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Description:</Typography>
                          <Typography paragraph>
                            {expense.description}
                          </Typography>
                          {expense?.ExpenseReceipts?.length || 0 > 0 ? (
                            // <Carousel>
                            //   {expense?.ExpenseReceipts?.map(
                            //     (expenseReceipt: any) => (
                            //       <CardMedia
                            //         style={{ height: '140px' }}
                            //         image={expenseReceipt.receipt}
                            //       />
                            //     )
                            //   )}
                            // </Carousel>
                            <h1>Carousal Should have been here</h1>
                          ) : null}
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid
                className='expenseCardContainer'
                container
                direction='row'
                justify='center'
                alignItems='center'
                style={{ margin: 0, width: '100%' }}
              >
                <Grid item xs={12} sm={10} md={8} lg={8}>
                  {expenses.map((expense: IExpense) => (
                    <Card className='expenseCard' style={{ marginTop: '2%' }}>
                      <CardContent>
                        <h2 style={{ textAlign: 'center' }}>{expense.title}</h2>
                        <Grid
                          className='expenseCardContent'
                          container
                          direction='row'
                        >
                          <Grid item xs={6}>
                            <h3 style={{ textAlign: 'left' }}>
                              {expense.type}
                            </h3>
                            {setExpenseIcon(expense.type)}
                          </Grid>

                          <Grid item xs={6}>
                            <h3 style={{ textAlign: 'right' }}>
                              £ <CountUp decimals={2} end={expense.amount} />
                            </h3>
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
                      <CardActions disableSpacing>
                        <IconButton
                          aria-label='View'
                          onClick={() =>
                            history.push(`/expense?id=${expense.id}`)
                          }
                        >
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
                      </CardActions>
                      <Collapse in={expanded} timeout='auto' unmountOnExit>
                        <CardContent>
                          <Typography paragraph>Description:</Typography>
                          <Typography paragraph>
                            {expense.description}
                          </Typography>
                          {expense?.ExpenseReceipts?.length || 0 > 0 ? (
                            // <Carousel>
                            //   {expense?.ExpenseReceipts?.map(
                            //     (expenseReceipt: any) => (
                            //       <CardMedia
                            //         style={{ height: '140px' }}
                            //         image={expenseReceipt.receipt}
                            //       />
                            //     )
                            //   )}
                            // </Carousel>
                            <h1> Carousel should have been here </h1>
                          ) : null}
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </Grid>

      <Tooltip title='Add Expense' aria-label='Add Expense'>
        <Fab
          color='primary'
          onClick={onCreateExpense}
          style={{ float: 'right', marginTop: '1%' }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog
        open={dialogData.open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          Delete {dialogData.title} Expense
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete {dialogData.title} expense ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deleteExpenseConfirm} color='primary' autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default observer(ExpenseList);
