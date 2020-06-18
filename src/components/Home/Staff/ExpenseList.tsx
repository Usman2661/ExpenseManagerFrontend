import React, { useContext, useEffect } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import CommuteIcon from '@material-ui/icons/Commute';
import Alert from '@material-ui/lab/Alert';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import { observer } from 'mobx-react-lite';
import { IExpense } from '../../../models/Expense';

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

function ExpenseList() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

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

  return (
    <div>
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
                              Pending
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
                          <Typography paragraph>Method:</Typography>
                          <Typography paragraph>
                            Heat 1/2 cup of the broth in a pot until simmering,
                            add saffron and set aside for 10 minutes.
                          </Typography>
                          <Typography paragraph>
                            Heat oil in a (14- to 16-inch) paella pan or a
                            large, deep skillet over medium-high heat. Add
                            chicken, shrimp and chorizo, and cook, stirring
                            occasionally until lightly browned, 6 to 8 minutes.
                            Transfer shrimp to a large plate and set aside,
                            leaving chicken and chorizo in the pan. Add
                            pimentón, bay leaves, garlic, tomatoes, onion, salt
                            and pepper, and cook, stirring often until thickened
                            and fragrant, about 10 minutes. Add saffron broth
                            and remaining 4 1/2 cups chicken broth; bring to a
                            boil.
                          </Typography>
                          <Typography paragraph>
                            Add rice and stir very gently to distribute. Top
                            with artichokes and peppers, and cook without
                            stirring, until most of the liquid is absorbed, 15
                            to 18 minutes. Reduce heat to medium-low, add
                            reserved shrimp and mussels, tucking them down into
                            the rice, and cook again without stirring, until
                            mussels have opened and rice is just tender, 5 to 7
                            minutes more. (Discard any mussels that don’t open.)
                          </Typography>
                          <Typography>
                            Set aside off of the heat to let rest for 10
                            minutes, and then serve.
                          </Typography>
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
    </div>
  );
}

export default observer(ExpenseList);
