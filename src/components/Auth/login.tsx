import React, { Component, useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { UserContext } from '../../userContext';
import UserStore from '../../MobX/store/UserStore';
import { CardMedia } from '@material-ui/core';
import background from '../../assets/background.jpg'; // Tell webpack this JS file uses this image
import logo from '../../assets/logo.png'; // Tell webpack this JS file uses this image



export function Login(props: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const userStore = useContext(UserStore);
  const { login, getUserProfile } = userStore;

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
          managerId: data.user.managerId,
          token: data.token,
          companyName: data.user?.Company?.name,
          width: '240',
        });

        const me = await getUserProfile();
        if (me.name) {
          props.history.push('/home');
        }
      }
    } catch (error) {
      return error;
    }
  };

  return (
 
        <div className='loginForm'  style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'}}>
          <Grid
           style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden'}}
            className='loginContainer'
            container
            direction='row'
          >
            <Grid item xs={12} sm={8} md={6} lg={5}>
              {/* <Paper className='login'>
                <Card className='loginCard '>
                  <CardContent> */}
{/* 
                    <Grid
                        className='loginForm'
                        container
                        spacing={2}
                        direction='row'
                        justify='center'
                        alignItems='center'
                      >
                      <Grid item xs={12} sm={8} md={6} lg={6}>

                        </Grid> */}



                  <div>
                        {/* <img
                src={logo}
                alt="logo"
                height='10%'
                width='10%'
                /> */}
                  <h2 style={{ textAlign: 'center' }}> ExpenseManager </h2>
                        </div>
              
                    <ValidatorForm className='loginForm' onSubmit={loginUser}>
                      <Grid
                       container    
                        direction='row'
                        justify='center'
                        alignItems='center'
                        spacing={2}
                        style={{ paddingLeft:'25%', paddingRight:'25%'}}
                        >
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
                            style={{height:'60px'}}
                            // onClick={loginUser}
                          >
                            Login
                          </Button>


                        </Grid>
                      </Grid>
                    </ValidatorForm>
           
                  {/* </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper> */}
            </Grid>
            <Grid item xs={12} sm={8} md={6} lg={7}>

            
                <div className='backgroundImgContainer'   
                style={{ height: '100%' }}          
                >
                <img
                src={background}
                alt="background"
                height='100%'
                width='100%'
                />
                </div>
               

            </Grid>
          </Grid>
        </div>
  );
}
