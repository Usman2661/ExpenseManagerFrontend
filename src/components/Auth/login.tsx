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
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import background from '../../assets/13.jpg'; // Tell webpack this JS file uses this image
import logo from '../../assets/logo.png'; // Tell webpack this JS file uses this image



export function Login(props: any) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [state, setState] = React.useState({
    checkedB: false,
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

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
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
 
        <div className='loginForm'  style={{ height: '100%', position: 'fixed', width: '100%', overflow: 'hidden', marginTop:'-7px'}}>
          <Grid
           style={{ height: '100%', position: 'fixed', width: '100%', overflow: 'hidden'}}
            className='loginContainer'
            container
            direction='row'
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
         
                    <Grid
                        style={{ height: '100%', overflow: 'hidden'}}
                        className='loginContent'
                        container
                        spacing={2}
                        direction='column'
                        justify='center'
                        alignItems='center'
                      >
                      <Grid item xs={11} sm={8} md={10} lg={8}>
                      <ValidatorForm className='loginForm' onSubmit={loginUser}>
                      <Grid
                       container    
                        direction='row'
                        justify='center'
                        alignItems='center'
                        spacing={2}
                        // style={{ paddingLeft:'25%', paddingRight:'25%', paddingTop:'25%'}}
                        >
                        <Grid item xs={5} sm={5} md={5} lg={5}>
                        <div style={{float:'right'}}>
                        <img src={logo} height='50px' width='50px' style={{marginRight:'10px'}}/>
                        </div>
                        </Grid>
                        <Grid item xs={7} sm={7} md={7} lg={7}>
                        <div style={{marginLeft:'-20px'}}>
                        <h2 style={{fontSize:'20px', fontWeight:'bolder', color:'#17202A'}} >
                          ExpenseManager 
                        </h2>
                        </div>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextValidator

                            inputProps={{style: {fontSize: 18,fontFamily:'Arial', letterSpacing:'0.5px'}}} // font size of input text
                            InputLabelProps={{style: {fontSize: 18  }}} // font size of input label
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
                            inputProps={{style: {fontSize: 18,fontFamily:'Arial', letterSpacing:'0.5px'}}} // font size of input text
                            InputLabelProps={{style: {fontSize: 18  }}} // font size of input label
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
                            style={{height:'50px', fontSize:'18px', textTransform: 'none'}}
                          >
                            Login
                          </Button>
                        </Grid>
                        <Grid item xs={6} sm={6}>
                        <div>
                        <FormControlLabel className='rememberMe'
                        // style={{ fontSize:'17px !important', fontWeight:'bold' }}
                      control={
                        <Checkbox
                          checked={state.checkedB}
                          onChange={handleChange}
                          name="checkedB"
                          color="primary"
                        />
                         }
                      label={    <Typography component="h3"  style={{ fontSize:'17px !important', fontWeight:'bolder' , color:'#424949' }}
                      > Remember Me </Typography>
                    }
                      />
                        </div>
                        </Grid>

                        <Grid item xs={6} sm={6}>
                          <div style={{float: 'right'}}>
                          <a href='' style={{ color:'primary', fontSize:'17px' , textDecoration:'none' , fontWeight:'bolder' }}>Forgot Password?</a>
                          </div>
                        </Grid>
                      </Grid>
                    </ValidatorForm>
          
                      </Grid>

                      </Grid>



  
              
            </Grid>


      <Grid
        component={Box}
        className='backgroundImg'
        item
        xs={12} sm={12} md={6} lg={6} xl={6}
                display={{ xs: "none",sm: 'none', lg: "block" , xl: "block", md: "block" }}
      >
       
       
       
       <div className='backgroundImgContainer'   
                style={{ height: '100%', overflow: 'hidden' }}          
                >
                <img
                src={background}
                alt="background"
                height='100%'
                width='100%'
                style={{overflow:'hidden'}}
                />
                </div>
      </Grid>

            {/* <Grid item xs={1} sm={1} md={6} lg={6}>

               

            </Grid> */}
          </Grid>
        </div>
  );
}
