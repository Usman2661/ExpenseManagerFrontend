import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

export class Register extends Component {
  render() {
    return (
      <div>
        <div className='registerForm'>
          <Grid
            container
            xs={12}
            sm={10}
            md={6}
            justify='center'
            alignItems='center'
          >
            <Paper className='registration'>
              <Card className='registerCard '>
                <CardContent>
                  <div style={{ marginLeft: '40%' }}>
                    {' '}
                    {/* <Avatar className='signUpIcon'>
                      <AccountBoxIcon />
                    </Avatar> */}
                    <h1> Sign Up </h1>
                  </div>
                  <form className='signUpForm'>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          name='name'
                          variant='outlined'
                          required
                          fullWidth
                          id='name'
                          label='Name'
                          color='secondary'
                          autoFocus
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          name='jobTitle'
                          variant='outlined'
                          required
                          fullWidth
                          id='jobTitle'
                          color='secondary'
                          label='Job Title'
                          autoFocus
                        />
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <FormControl
                          variant='filled'
                          className='deparment'
                          fullWidth
                        >
                          <InputLabel id='demo-simple-select-filled-label'>
                            Department
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-filled-label'
                            id='demo-simple-select-filled'
                            value='Technology'
                            fullWidth
                          >
                            <MenuItem value=''>
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value='Sales'>Sales</MenuItem>
                            <MenuItem value='Technology'>Technology</MenuItem>
                            <MenuItem value='Management'>Management</MenuItem>
                            <MenuItem value='HR'>HR</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={12}>
                        <TextField
                          id='outlined-basic'
                          label='Email'
                          variant='outlined'
                          type='email'
                          color='secondary'
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id='password'
                          label='Password'
                          variant='outlined'
                          type='password'
                          color='secondary'
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          id='confirmPassword'
                          label='Confirm Password'
                          variant='outlined'
                          type='password'
                          color='secondary'
                          required
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <Button
                          variant='contained'
                          color='secondary'
                          type='submit'
                          fullWidth
                        >
                          Sign Up
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
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
