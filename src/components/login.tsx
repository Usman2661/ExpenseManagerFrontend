import React, { Component, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { useMutation } from '@apollo/react-hooks';
import { CREATE_USER } from '../graphQL/mutation/user.mutation';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';

export function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = (e: any) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <div>
      <div>
        <div className='loginForm'>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper className='login'>
                <Card className='loginCard '>
                  <CardContent>
                    <div style={{ marginLeft: '40%' }}>
                      {' '}
                      <h1> Login </h1>
                    </div>
                    <form className='loginForm'>
                      <Grid container spacing={2}>
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
                          <Button
                            variant='contained'
                            color='secondary'
                            type='submit'
                            fullWidth
                            onClick={loginUser}
                          >
                            Login
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Link to='/register'>
                            Dont have an account ? Sign Up
                          </Link>
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
