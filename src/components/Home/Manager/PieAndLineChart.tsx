import React, { useContext, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Pie from '../../Charts/Pie';
import { observer } from 'mobx-react-lite';
import alasql from 'alasql';
import ExpenseStore from '../../../MobX/store/ExpenseStore';

function PieAndLineChart() {
  const expenseStore = useContext(ExpenseStore);
  const { managerExpenses } = expenseStore;

  useEffect(() => {}, []);

  let series: Number[] = [];
  let labels: String[] = [];

  const topCatagories = alasql(
    'SELECT SUM(amount) AS totalClaimed,type FROM ? Group By type',
    [managerExpenses]
  );

  if (topCatagories.length > 1) {
    topCatagories.map((topCatagory: any) => {
      series.push(parseInt(topCatagory.totalClaimed));
      labels.push(topCatagory.type.toString());
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
        <Grid item xs={12} sm={5} md={5} lg={4}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              {labels.length > 0 ? (
                <Pie labels={labels} series={series} />
              ) : null}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={7} md={7} lg={8}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <h1>Line Card</h1>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(PieAndLineChart);
