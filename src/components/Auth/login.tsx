import React, { Component, useState, useContext } from 'react';
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
import { CREATE_USER, LOGIN_USER } from '../../graphQL/mutation/user.mutation';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Alert from '@material-ui/lab/Alert';
import { UserContext } from '../../userContext';
import { setHeaders } from '../../graphQL/graphqlconfig';
import { observer } from 'mobx-react-lite';
import UserStore from '../../MobX/store/UserStore';

export function Login(props: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const userStore = useContext(UserStore);
  const { login } = userStore;

  if (userAuthData.auth) {
    props.history.push('/home');
  }

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loginUser = async (e: any) => {
    e.preventDefault();
    try {
      const data = await login(formData.email, formData.password);

      if (data.token) {
        setUserAuthData({
          id: data.user.id,
          auth: true,
          name: data.user.name,
          email: data.user.email,
          userType: data.user.userType,
          token: data.token,
        });
        props.history.push('/home');
      }
    } catch (error) {
      return error;
    }
  };

  return (
    <div>
      <div>
        <div className='loginForm'>
          <Grid
            className='loginContainer'
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper className='login'>
                <Card className='loginCard '>
                  <CardContent>
                    <div style={{ marginLeft: '40%' }}>
                      {' '}
                      <h1> Login </h1>
                    </div>
                    <ValidatorForm className='loginForm' onSubmit={loginUser}>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                          <TextValidator
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            color='primary'
                            value={email}
                            onChange={(e: any) => onChange(e)}
                            validators={['required', 'isEmail']}
                            errorMessages={[
                              'Email is required',
                              'Email is not valid',
                            ]}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextValidator
                            id='password'
                            name='password'
                            label='Password'
                            variant='outlined'
                            type='password'
                            color='primary'
                            value={password}
                            onChange={(e) => onChange(e)}
                            fullWidth
                            validators={['required']}
                            errorMessages={['Password is required']}
                            required
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            fullWidth
                            // onClick={loginUser}
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
                    </ValidatorForm>
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
