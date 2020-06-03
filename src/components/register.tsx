import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
export class Register extends Component {
  render() {
    return (
      <div>
        <div className='registerForm' style={{ marginTop: '20%' }}>
          <Grid
            item
            xs={3}
            spacing={0}
            direction='column'
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh' }}
          >
            <Paper className='registration'>
              <Card className='registerCard '>
                <CardContent>
                  <h1> Sign Up </h1>
                </CardContent>
                <CardActions>
                  {/* <Button size='small'>Learn More</Button> */}
                </CardActions>
              </Card>
            </Paper>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Register;
