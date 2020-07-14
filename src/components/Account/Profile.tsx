import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import '../../css/StatCards.css';
import Button from '@material-ui/core/Button';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { IUserModalState } from '../User/UsersModal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
  })
);

export default function Profile() {
  const classes = useStyles();
  const theme = useTheme();

  const user = {
    id: 0,
    name: 'Usman Ali',
    email: 'uali@modernnetworks.co.uk',
    password: 'test',
    jobTitle: 'software develloper',
    userType: 'Staff',
    department: 'Technology',
    managerId: 14,
    companyId: 1,
  };

  const [userData, setUserData] = useState<IUserModalState>({
    id: user?.id || 0,
    name: user?.name || '',
    email: user?.email || '',
    password: user?.password || '',
    cfPassword: '',
    jobTitle: user?.jobTitle || '',
    userType: user?.userType || 'SeniorManagement',
    department: user?.department || '',
    managerId: user?.managerId || undefined,
    companyId: user?.companyId || undefined,
  });

  // Destructuring
  const {
    id,
    name,
    email,
    password,
    cfPassword,
    jobTitle,
    userType,
    department,
    managerId,
    companyId,
  } = userData;

  const onChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <Grid
        className='statAndMixed'
        container
        direction='row'
        spacing={2}
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={4} md={4} lg={4}>
          <Card variant='outlined' className='cardRaiased'>
            <CardContent>
              <div
                className='ProfileSettings'
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  margin: '0',
                  wordSpacing: 'none',
                }}
              >
                <Avatar
                  className={classes.orange}
                  style={{ height: '90px', width: '90px' }}
                >
                  <h1 style={{ fontSize: '40' }}>U</h1>
                </Avatar>
                <Typography style={{ marginTop: 'auto' }} variant='h4'>
                  Usman Ali
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',

                    fontWeight: 'bold',
                    color: '#7B7D7D',
                  }}
                >
                  Software Developer
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',
                    color: '#7B7D7D',
                    fontStyle: 'italic',
                  }}
                >
                  Staff
                </Typography>
                <Button color='primary'>Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8} md={8} lg={8}>
          <Card variant='outlined' className='cardRaiased'>
            <CardHeader title='Profile' />

            <Divider />
            <CardContent>
              <ValidatorForm className='signUpForm' onSubmit={saveChanges}>
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

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      name='userType'
                      variant='outlined'
                      disabled={true}
                      required
                      fullWidth
                      id='userType'
                      color='primary '
                      label='User Type'
                      onChange={(e) => onChange(e)}
                      value={userType}
                      validators={['required']}
                      errorMessages={['User Type is required']}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      name='deparment'
                      variant='outlined'
                      disabled={true}
                      required
                      fullWidth
                      id='deparment'
                      color='primary'
                      label='Department'
                      onChange={(e) => onChange(e)}
                      value={department}
                      validators={['required']}
                      errorMessages={['Department is required']}
                    />
                  </Grid>

                  {/* {userAuthData.userType === 'Admin' ? (
                    <Grid item xs={12} sm={12}>
                      <FormControl
                        variant='filled'
                        className='company'
                        color='primary'
                        fullWidth
                        required
                      >
                        <InputLabel id='demo-simple-select-filled-label'>
                          Company
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-filled-label'
                          id='demo-simple-select-filled'
                          name='companyId'
                          value={companyId}
                          onChange={(e) => onChange(e)}
                          fullWidth
                          required
                          color='primary'
                        >
                          {renderCompaniesSelectOptions()}
                        </Select>
                      </FormControl>
                    </Grid>
                  ) : null} */}

                  <Grid item xs={12} sm={12}>
                    <FormControl
                      variant='filled'
                      className='managerId'
                      color='primary'
                      disabled={true}
                      fullWidth
                      required
                    >
                      <InputLabel id='demo-simple-select-filled-label'>
                        Manager
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-filled-label'
                        id='demo-simple-select-filled'
                        name='managerId'
                        value={managerId}
                        onChange={(e) => onChange(e)}
                        fullWidth
                        required
                        color='primary'
                      >
                        {/* {renderManagerSelectOptions()} */}
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
                      disabled={true}
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
                  {/* 
                  {edit ? null : (
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
                  )}
                  {edit ? null : (
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
                  )} */}
                  <Divider />
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                      fullWidth
                    >
                      Save Changes
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} sm={12}>
                    <Button
                      variant='contained'
                      color='secondary'
                      type='submit'
                      onClick={onCancel}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid> */}
                </Grid>
              </ValidatorForm>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
