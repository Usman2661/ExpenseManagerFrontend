import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CountUp from 'react-countup';
import HotelIcon from '@material-ui/icons/Hotel';
import { deepPurple } from '@material-ui/core/colors';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import alasql from 'alasql';
import CommuteIcon from '@material-ui/icons/Commute';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import HelpIcon from '@material-ui/icons/Help';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    typeIcon: {
      fontSize: 70,
      float: 'left',
      color: 'blue',
    },
    deepPurple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  })
);

function DepartmentPieTypeList() {
  const classes = useStyles();
  const expenseStore = useContext(ExpenseStore);
  const { seniorExpenses, info } = expenseStore;

  const topExpenseType = alasql(
    'SELECT SUM(amount) AS totalClaimed,count(title) as claims, type FROM ? Group By type',
    [seniorExpenses]
  );

  topExpenseType.sort(function (a: any, b: any) {
    return b.totalClaimed - a.totalClaimed;
  });

  const setExpenseIcon = (expenseType: String) => {
    const expenseTypeIcons = [
      {
        type: 'Food',
        icon: <FastfoodIcon />,
      },
      {
        type: 'Transport',
        icon: <CommuteIcon />,
      },
      {
        type: 'Accomodation',
        icon: <HotelIcon />,
      },
      {
        type: 'Training',
        icon: <MenuBookIcon />,
      },
      {
        type: 'Equipment',
        icon: <DevicesOtherIcon />,
      },
      {
        type: 'Other',
        icon: <HelpIcon />,
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
        className='statAndMixed'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent>
              <List className={classes.root}>
                {topExpenseType.length > 0 &&
                topExpenseType[0].type != undefined ? (
                  <div>
                    {topExpenseType.map((topExpense: any) => (
                      <div>
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar className={classes.deepPurple}>
                              {setExpenseIcon(topExpense.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={topExpense.type}
                            secondary={`Claims:${topExpense.claims}`}
                          />
                          <h3>
                            £
                            <CountUp
                              decimals={2}
                              end={topExpense.totalClaimed}
                            />
                          </h3>
                        </ListItem>
                        <Divider />
                      </div>
                    ))}
                  </div>
                ) : null}
              </List>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
export default observer(DepartmentPieTypeList);
