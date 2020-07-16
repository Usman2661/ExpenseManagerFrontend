import React, { useState, useContext, useEffect } from 'react';
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
import UserStore from '../../MobX/store/UserStore';
import { observer } from 'mobx-react-lite';
import Dialog from '@material-ui/core/Dialog';
import { IDialogState } from '../Home/Staff/ExpenseList';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

function Profile() {
  const classes = useStyles();
  const theme = useTheme();

  const userStore = useContext(UserStore);
  const {
    userProfile,
    userProfileLoaded,
    getUserProfile,
    updateUser,
    changePassword,
  } = userStore;

  useEffect(() => {
    if (!userProfileLoaded) {
      retrieveProfile();
    }
  }, []);

  const [userData, setUserData] = useState<IUserModalState>({
    id: userProfile?.id || 0,
    name: userProfile?.name || '',
    email: userProfile?.email || '',
    password: userProfile?.password || '',
    cfPassword: '',
    newPassword: '',
    jobTitle: userProfile?.jobTitle || '',
    userType: userProfile?.userType || '',
    department: userProfile?.department || '',
    managerId: userProfile?.managerId || undefined,
    companyId: userProfile?.companyId || undefined,
  });

  const [dialogData, setDialogData] = useState<IDialogState>({
    open: false,
  });

  const { open } = dialogData;

  const retrieveProfile = async () => {
    const data = await getUserProfile();

    if (data) {
      setUserData({
        ...userData,
        id: data.id,
        name: data.name || '',
        email: data.email || '',
        password: data.password || '',
        cfPassword: '',
        jobTitle: data.jobTitle || '',
        userType: data.userType || '',
        department: data.department || '',
        managerId: data.managerId || undefined,
        companyId: data.companyId || undefined,
      });
    }
  };

  // Destructuring
  const {
    id,
    name,
    email,
    password,
    cfPassword,
    newPassword,
    jobTitle,
    userType,
    department,
    managerId,
    companyId,
  } = userData;

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== userData.newPassword) {
      return false;
    }
    return true;
  });

  ValidatorForm.addValidationRule('isOldPassword', (value) => {
    if (value === userData.password) {
      return false;
    }
    return true;
  });

  const handleClose = () => {
    setDialogData({
      ...dialogData,
      open: false,
    });
  };

  const onChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async (e: any) => {
    e.preventDefault();

    await updateUser(userData);
    await getUserProfile();
  };

  const onChangePassword = async (e: any) => {
    e.preventDefault();

    if (password != undefined && newPassword != undefined) {
      const data = await changePassword(password, newPassword);

      if (data) {
        setUserData({
          ...userData,
          password: '',
          newPassword: '',
          cfPassword: '',
        });
        handleClose();
      }
    }
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
                  <h1 style={{ fontSize: '40' }}>
                    {userProfile.name.charAt(0)}
                  </h1>
                </Avatar>
                <Typography style={{ marginTop: 'auto' }} variant='h4'>
                  {userProfile.name}
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',

                    fontWeight: 'bold',
                    color: '#7B7D7D',
                  }}
                >
                  {userProfile.jobTitle}
                </Typography>
                <Typography
                  style={{
                    marginTop: 'auto',
                    color: '#7B7D7D',
                    fontStyle: 'italic',
                  }}
                >
                  {userProfile.userType}
                </Typography>
                <Button
                  color='primary'
                  onClick={() =>
                    setDialogData({
                      ...dialogData,
                      open: true,
                    })
                  }
                >
                  Change Password
                </Button>
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

                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      name='managerId'
                      variant='outlined'
                      disabled={true}
                      required
                      fullWidth
                      id='managerId'
                      color='primary'
                      label='Manager'
                      onChange={(e) => onChange(e)}
                      value={
                        userProfile?.Manager?.name +
                        ' - ' +
                        userProfile?.Manager?.jobTitle +
                        ' - ' +
                        userProfile?.Manager?.email
                      }
                      validators={['required']}
                      errorMessages={['Manager is required']}
                    />
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

      <Grid
        className='userModalGrid'
        container
        direction='row'
        justify='center'
        alignItems='center'
        style={{ margin: 0, width: '100%' }}
      >
        <Grid item xs={12} sm={10} md={8} lg={6}>
          <Dialog
            onClose={handleClose}
            aria-labelledby='simple-dialog-title'
            open={dialogData.open}
          >
            <div className={classes.paper}>
              <h2 id='simple-modal-title' style={{ textAlign: 'center' }}>
                Change Password
              </h2>

              <ValidatorForm className='signUpForm' onSubmit={onChangePassword}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      id='password'
                      name='password'
                      label='Old Password'
                      variant='outlined'
                      type='password'
                      color='primary'
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
                      id='newPassword'
                      name='newPassword'
                      label='New Password'
                      variant='outlined'
                      type='password'
                      color='primary'
                      value={newPassword}
                      onChange={(e) => onChange(e)}
                      validators={['isOldPassword', 'required']}
                      errorMessages={[
                        'New Password cannot be same as old password',
                        'New Password is required',
                      ]}
                      required
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      id='cfPassword'
                      name='cfPassword'
                      label='Confirm New Password'
                      variant='outlined'
                      type='password'
                      color='primary'
                      value={cfPassword}
                      onChange={(e) => onChange(e)}
                      validators={['isPasswordMatch', 'required']}
                      errorMessages={[
                        'Passwords do not match',
                        'Confirm New Password is required',
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
                      Save
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Button
                      variant='contained'
                      color='secondary'
                      onClick={handleClose}
                      fullWidth
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </ValidatorForm>
            </div>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(Profile);
