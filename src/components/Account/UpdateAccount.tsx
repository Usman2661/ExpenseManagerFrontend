import React, { useState, useEffect, useContext } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import TextField from '@material-ui/core/TextField';
import { useLazyQuery } from '@apollo/react-hooks';
import { request, GraphQLClient } from 'graphql-request';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { GET_USER } from '../../graphQL/query/query';
import { UPDATE_USER } from '../../graphQL/mutation/user.mutation';
import { UserContext } from '../../userContext';
import { format } from 'util';
import { setHeaders } from '../../graphQL/graphqlconfig';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    button: {
      marginRight: theme.spacing(1),
      //   float: 'right',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

function getSteps() {
  return ['User Details', 'Asign a User Type', 'Assign Manager'];
}

export function UpdateAccount(props: any) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();

  const urlParams = new URLSearchParams(window.location.search);
  const userID = urlParams.get('id');

  const id = parseInt(userID || '0');

  useEffect(() => {
    loadUser();
  }, []);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    jobTitle: '',
    department: '',
    userType: '',
    managerId: '',
    managersList: [],
  });

  const {
    name,
    email,
    jobTitle,
    department,
    userType,
    managerId,
    managersList,
  } = formData;

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const graphQLClient = setHeaders();

  let managerList;

  managerList = userAuthData.allUsers.filter((user: any) => {
    return (
      user.id !== id && user.userType !== 'Staff' && user.userType !== null
    );
  });

  if (formData.userType === 'SeniorManagement') {
    managerList = userAuthData.allUsers.filter((user: any) => {
      return user.id !== id && user.userType === 'SeniorManagement';
    });
  }

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    if (formData.userType === 'SeniorManagement') {
      managerList = userAuthData.allUsers.filter((user: any) => {
        return user.id !== id && user.userType === 'SeniorManagement';
      });
    }
  };

  const isStepOptional = (step: number) => {
    return null;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    if (activeStep === 2) {
      updateUser();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const updateUser = async () => {
    try {
      const variables = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        department: formData.department,
        jobTitle: formData.jobTitle,
        userType: formData.userType,
        managerId: formData.managerId,
      };
      const data = await graphQLClient.request(UPDATE_USER, variables);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadUser = async () => {
    try {
      const variables = {
        id: id,
      };

      const data = await graphQLClient.request(GET_USER, variables);
      setFormData({
        ...formData,
        id: data?.user.id,
        name: data?.user.name,
        email: data?.user.email,
        userType: data?.user.userType,
        jobTitle: data?.user.jobTitle,
        department: data?.user.department,
        managerId: data?.user.managerId,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className={classes.root}>
      <Grid
        container
        justify='center'
        alignItems='center'
        className='updateAccountContainer'
      >
        <Grid item xs={12} sm={8} md={6} lg={6}>
          <Paper className='registration'>
            <Card className='registerCard '>
              <CardContent>
                <Stepper activeStep={activeStep}>
                  {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: { optional?: React.ReactNode } = {};
                    if (isStepOptional(index)) {
                      labelProps.optional = (
                        <Typography variant='caption'>Optional</Typography>
                      );
                    }
                    if (isStepSkipped(index)) {
                      stepProps.completed = false;
                    }
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel {...labelProps}>{label}</StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                <div>
                  {activeStep === steps.length ? (
                    <div>
                      <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Button onClick={handleReset} className={classes.button}>
                        Reset
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <Typography className={classes.instructions}>
                        {(() => {
                          if (activeStep === 0)
                            return (
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    name='name'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='name'
                                    label='Name'
                                    color='primary'
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
                                    color='primary'
                                    label='Job Title'
                                    onChange={(e) => onChange(e)}
                                    value={jobTitle}
                                    autoFocus
                                    //   validators={['required']}
                                    //   errorMessages={['Job Title is required']}
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
                                      <MenuItem value='Technology'>
                                        Technology
                                      </MenuItem>
                                      <MenuItem value='Management'>
                                        Management
                                      </MenuItem>
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
                                    color='primary'
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    required
                                    fullWidth
                                    autoFocus
                                  />
                                </Grid>
                              </Grid>
                            );
                          if (activeStep === 1)
                            return (
                              <Grid item xs={12} sm={12}>
                                <FormControl
                                  variant='filled'
                                  className='userType'
                                  color='primary'
                                  fullWidth
                                  required
                                >
                                  <InputLabel id='demo-simple-select-filled-label'>
                                    User Type
                                  </InputLabel>
                                  <Select
                                    labelId='demo-simple-select-filled-label'
                                    id='demo-simple-select-filled'
                                    name='userType'
                                    value={userType}
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    color='primary'
                                  >
                                    <MenuItem value=''>
                                      <em>None</em>
                                    </MenuItem>
                                    <MenuItem value='Staff'>Staff</MenuItem>
                                    <MenuItem value='Manager'>Manager</MenuItem>
                                    <MenuItem value='SeniorManagement'>
                                      Senior Management
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              </Grid>
                            );
                          if (activeStep === 2)
                            return (
                              <Grid item xs={12} sm={12}>
                                <FormControl
                                  variant='filled'
                                  className='managerid'
                                  color='primary'
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
                                    // value={managerId}
                                    value=''
                                    onChange={(e) => onChange(e)}
                                    fullWidth
                                    required
                                    color='primary'
                                  >
                                    <MenuItem value=''>
                                      <em>None</em>
                                    </MenuItem>
                                    {managerList.map((manager: any) => (
                                      <MenuItem value={manager.id}>
                                        {manager.name}
                                        {'-'} {manager.jobTitle}
                                      </MenuItem>
                                    ))}{' '}
                                    ;
                                  </Select>
                                </FormControl>
                              </Grid>
                            );
                          else;
                          return <span>Unknown Step</span>;
                        })()}
                      </Typography>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          className={classes.button}
                        >
                          Back
                        </Button>
                        {isStepOptional(activeStep) && (
                          <Button
                            variant='contained'
                            color='primary'
                            onClick={handleSkip}
                            className={classes.button}
                          >
                            Skip
                          </Button>
                        )}
                        <Button
                          variant='contained'
                          color='primary'
                          onClick={handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
