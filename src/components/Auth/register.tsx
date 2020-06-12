import React, { useState, useContext } from 'react';
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
import { CREATE_USER } from '../../graphQL/mutation/user.mutation';
import { Route, Link, BrowserRouter, withRouter } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import { UserContext } from '../../userContext';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export function Register(props: any) {
  // Using the variables for storing registration details
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    cfPassword: '',
    jobTitle: '',
    department: '',
  });

  // Destructuring
  const { name, email, password, cfPassword, jobTitle, department } = formData;

  //Fetching the userContext data
  const { userAuthData, setUserAuthData } = useContext(UserContext);

  //Adding is password match validation rule
  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== formData.password) {
      return false;
    }
    return true;
  });

  //If the user is authenticated redirect to the home page
  if (userAuthData.auth) {
    props.history.push('/home');
  }

  //When data in the form is changed map values to the state
  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Call the register user action
  const registerUser = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await saveUser();
    } catch (e) {
      console.log(e);
    }
  };
  const [saveUser, { error, data }] = useMutation(CREATE_USER, {
    errorPolicy: 'ignore',
    variables: {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      jobTitle: formData.jobTitle,
      department: formData.department,
    },
  });

  return (
    <div>
      <div>
        <div className='registerForm'>
          <Grid
            container
            justify='center'
            alignItems='center'
            className='registerContainer'
          >
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <Paper className='registration'>
                <Card className='registerCard '>
                  <CardContent>
                    {error ? (
                      <Grid
                        container
                        spacing={2}
                        justify='center'
                        alignItems='center'
                      >
                        <Grid item xs={12} sm={12}>
                          <Alert variant='filled' severity='error'>
                            An error has occured {error.message}
                          </Alert>
                        </Grid>
                      </Grid>
                    ) : null}
                    {data && data.createUser ? (
                      <Grid
                        container
                        spacing={2}
                        justify='center'
                        alignItems='center'
                      >
                        <Grid item xs={12} sm={12}>
                          <Alert variant='filled' severity='success'>
                            Profile succesfully created for{' '}
                            {data.createUser.name}
                          </Alert>
                        </Grid>
                      </Grid>
                    ) : null}
                    <div style={{ marginLeft: '40%' }}>
                      {' '}
                      <h1> Sign Up </h1>
                    </div>
                    <ValidatorForm
                      className='signUpForm'
                      onSubmit={registerUser}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextValidator
                            name='name'
                            variant='outlined'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            color='primary '
                            value={name}
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={['Name is required']}
                          />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <TextValidator
                            name='jobTitle'
                            variant='outlined'
                            required
                            fullWidth
                            id='jobTitle'
                            color='primary '
                            label='Job Title'
                            onChange={(e) => onChange(e)}
                            value={jobTitle}
                            validators={['required']}
                            errorMessages={['Job Title is required']}
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <FormControl
                            variant='filled'
                            className='deparment'
                            color='primary'
                            fullWidth
                            required
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
                              required
                              color='primary'
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
                          <TextValidator
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            type='email'
                            color='primary '
                            value={email}
                            onChange={(e) => onChange(e)}
                            required
                            validators={['required', 'isEmail']}
                            errorMessages={[
                              'Email is required',
                              'Email is not valid',
                            ]}
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
                            color='primary '
                            value={password}
                            onChange={(e) => onChange(e)}
                            validators={['required']}
                            errorMessages={['Password is required']}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextValidator
                            id='cfPassword'
                            name='cfPassword'
                            label='Confirm Password'
                            variant='outlined'
                            type='password'
                            color='primary '
                            value={cfPassword}
                            onChange={(e) => onChange(e)}
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={[
                              'Passwords do not match',
                              'Confirm Password is required',
                            ]}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                            fullWidth
                          >
                            Sign Up
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Link to='/'>Already have an account? Sign in</Link>
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
