import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import '../../../css/StatCards.css';

export function StatCards() {
  return (
    <div>
      <Grid
        className='cardContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent>
              <Grid className='statCard1' container direction='row'>
                <Grid item xs={6} style={{ marginTop: '4%' }}>
                  <Typography style={{ color: 'grey' }}>
                    Amount Claimed
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>£ 34,00</h1>
                </Grid>
                <Grid item xs={6}>
                  <MonetizationOnIcon
                    style={{ fontSize: 80, float: 'right', color: 'green' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' className='amountPending'>
            <CardContent>
              <Grid className='statCard2' container direction='row'>
                <Grid item xs={6} style={{ marginTop: '4%' }}>
                  <Typography style={{ color: 'grey' }}>
                    Amount Pending
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>£ 34,00</h1>
                </Grid>
                <Grid item xs={6}>
                  <MonetizationOnIcon
                    style={{ fontSize: 80, float: 'right', color: 'red' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card variant='outlined' className='totalClaims'>
            <CardContent>
              <Grid className='statCard3' container direction='row'>
                <Grid item xs={6} style={{ marginTop: '4%' }}>
                  <Typography style={{ color: 'grey' }}>
                    Total Claims
                  </Typography>
                  <h1 style={{ marginTop: 'auto' }}>1</h1>
                </Grid>
                <Grid item xs={6}>
                  <AssessmentIcon
                    color='primary'
                    style={{ fontSize: 80, float: 'right' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
