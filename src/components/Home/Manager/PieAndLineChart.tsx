import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PieGraph from '../../Charts/Pie';
import { observer } from 'mobx-react-lite';
import alasql from 'alasql';
import ExpenseStore from '../../../MobX/store/ExpenseStore';
import AreaGraph from '../../Charts/AreaGraph';
import Bar from '../../Charts/Bar';
import { IExpense } from '../../../models/Expense';
var dateFormat = require('dateformat');

function PieAndLineChart() {
  const expenseStore = useContext(ExpenseStore);
  const { managerExpenses } = expenseStore;

  useEffect(() => {}, []);

  let seriesPie: Number[] = [];
  let labelsPie: String[] = [];
  let seriesBar: Number[] = [];
  let labelsBar: String[] = [];

  const managerExpenseWithDate = managerExpenses.map((expense: any) => {
    const myDate = new Date(parseInt(expense.createdAt));

    expense['Date'] = dateFormat(myDate, 'dS mmmm');

    return expense;
  });

  const expenseByDate = alasql(
    'SELECT SUM(amount) AS totalClaimed,Date FROM ? Group By Date',
    [managerExpenses]
  );



  if (expenseByDate[0].Date !== undefined) {
    expenseByDate.map((expense: any) => {
      seriesBar.push(parseInt(expense.totalClaimed));
      labelsBar.push(expense.Date.toString());
    });
  }

  const topCatagories = alasql(
    'SELECT SUM(amount) AS totalClaimed,type FROM ? Group By type',
    [managerExpenses]
  );

  if (topCatagories[0].type !== undefined) {
    topCatagories.map((topCatagory: any) => {
      seriesPie.push(parseInt(topCatagory.totalClaimed));
      labelsPie.push(topCatagory.type.toString());
    });
  }

  return (
    <div>
      <Grid
        className='PieChartContainer'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={12} md={5} lg={4}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              {labelsPie.length > 0 ? (
                <PieGraph labels={labelsPie} series={seriesPie} />
              ) : null}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={7} lg={8}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <Bar
                name='Amount'
                title='Expense Per Date'
                catagories={labelsBar}
                data={seriesBar}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(PieAndLineChart);
