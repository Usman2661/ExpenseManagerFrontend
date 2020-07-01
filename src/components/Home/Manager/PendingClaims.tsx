import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export default function PendingClaims() {
  return (
    <div>
      <Grid
        className='pendingClainContainer'
        container
        direction='row'
        justify='center'
        alignItems='center'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={6} md={6} lg={6}>
          <Card variant='outlined' className='amountClaimed'>
            <CardContent>
              <h1>Top Users</h1>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
