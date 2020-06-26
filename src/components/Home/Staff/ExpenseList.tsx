import React, { useContext, useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CardMedia from '@material-ui/core/CardMedia';
import clsx from 'clsx';
import Carousel from 'react-material-ui-carousel';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CommuteIcon from '@material-ui/icons/Commute';
import Alert from '@material-ui/lab/Alert';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { observer } from 'mobx-react-lite';
import { IExpense } from '../../../models/Expense';
import ExpenseModal from '../../Expense/ExpenseModal';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import { IExpenseReceipts } from '../../../models/ExpenseReciepts';

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
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export interface ExpenseModalDataState {
  showExpenseModal: boolean;
  editExpense?: boolean;
  expense?: IExpense;
}

function ExpenseList() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [expenseModalData, setExpenseModalData] = useState<
    ExpenseModalDataState
  >({
    showExpenseModal: false,
    editExpense: false,
  });

  const { showExpenseModal, editExpense } = expenseModalData;

  const expenseStore = useContext(ExpenseStore);
  const { getExpenses, expenses } = expenseStore;

  useEffect(() => {
    getExpenses();
  }, []);

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
                            <CommuteIcon
                              style={{
                                fontSize: 70,
                                float: 'left',
                                marginTop: '-5%',
                                color: 'blue',
                              }}
                            />
                          </Grid>

                          <Grid item xs={6}>
                            <h3 style={{ textAlign: 'right' }}>
                              {' '}
                              {`£ ${expense.amount}`}
                            </h3>
                            <Alert
                              variant='filled'
                              severity='warning'
                              style={{ float: 'right', marginTop: '-5%' }}
                            >
                              {expense.status}
                            </Alert>
                          </Grid>
                        </Grid>
                      </CardContent>
                      <CardActions disableSpacing>
                        <IconButton aria-label='add to favorites'>
                          <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label='share'>
                          <ShareIcon />
                        </IconButton>
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
                            <Carousel>
                              {expense?.ExpenseReceipts?.map(
                                (expenseReceipt: any) => (
                                  <CardMedia
                                    style={{ height: '140px', width: '200px' }}
                                    image={expenseReceipt.receipt}
                                  />
                                )
                              )}
                            </Carousel>
                          ) : null}
                        </CardContent>
                      </Collapse>
                    </Card>
                  ))}
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              Item Two
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
    </div>
  );
}

export default observer(ExpenseList);
