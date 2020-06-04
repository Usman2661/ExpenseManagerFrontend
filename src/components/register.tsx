import React, { useState } from 'react';
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
import axios from 'axios';
import { useQuery, Query } from 'react-apollo';
import { GET_USERS } from '../graphQL/query';

export function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cfPassword: '',
    jobTitle: '',
    department: '',
  });
  const { name, email, password, cfPassword, jobTitle, department } = formData;

  const onChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const registerUser = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <div>
        <div className='registerForm'>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={8} md={6} lg={4}>
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
                            value={name}
                            onChange={(e) => onChange(e)}
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
                            onChange={(e) => onChange(e)}
                            value={jobTitle}
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <FormControl
                            variant='filled'
                            className='deparment'
                            color='secondary'
                            fullWidth
                          >
                            <InputLabel id='demo-simple-select-filled-label'>
                              Department
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-filled-label'
                              id='demo-simple-select-filled'
                              name='department'
                              value={department}
                              onChange={(e) => onChange(e)}
                              fullWidth
                              color='secondary'
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
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            type='email'
                            color='secondary'
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            id='password'
                            name='password'
                            label='Password'
                            variant='outlined'
                            type='password'
                            color='secondary'
                            value={password}
                            onChange={(e) => onChange(e)}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            id='cfPassword'
                            name='cfPassword'
                            label='Confirm Password'
                            variant='outlined'
                            type='password'
                            color='secondary'
                            value={cfPassword}
                            onChange={(e) => onChange(e)}
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
                            onClick={registerUser}
                          >
                            Sign Up
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Link to='/'>Already have an account? Sign in</Link>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
