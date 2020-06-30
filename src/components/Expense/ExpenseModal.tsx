import React, { useState, useContext, useEffect } from 'react';
import { ICompany } from '../../models/Company';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import CompanyStore from '../../MobX/store/CompanyStore';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { IUser } from '../../models/User';
import UserStore from '../../MobX/store/UserStore';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../userContext';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { IExpense, ExpenseStatus } from '../../models/Expense';
import ExpenseStore from '../../MobX/store/ExpenseStore';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import { Input } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
);

interface ExpenseModalProps {
  expense?: IExpense;
  edit?: boolean;
  onCancel: () => void;
}

export interface ExpenseModalState {
  id?: number;
  title: String;
  description?: String;
  type: String;
  amount: number;
  status: ExpenseStatus;
}

function getSteps() {
  return ['Expense Details', 'Upload Receipts'];
}

function ExpenseModal(props: ExpenseModalProps) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const steps = getSteps();

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const expenseStore = useContext(ExpenseStore);
  const { createExpense, updateExpense, getExpense } = expenseStore;

  const { edit, expense, onCancel } = props;

  const [expenseData, setExpenseData] = useState<ExpenseModalState>({
    id: expense?.id || undefined,
    title: expense?.title || '',
    description: expense?.description || '',
    type: expense?.type || '',
    amount: expense?.amount || 0,
    status: expense?.status || ExpenseStatus.Pending,
  });

  const [expenseReceipt, setExpenseReceipt] = useState({
    expenseId: '',
    files: [],
  });

  // Destructuring
  const { id, title, description, type, amount } = expenseData;

  const onChange = (e: any) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRecieptChange = (files: any) => {
    setExpenseReceipt({
      ...expenseReceipt,
      files: files,
    });
  };

  const onNumberChange = (e: any) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]:
        e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
    });
  };

  const saveExpense = async (e: any) => {
    e.preventDefault();

    if (edit) {
      const expense = await updateExpense(expenseData);

      setExpenseReceipt({
        ...expenseReceipt,
        expenseId: expense.id,
      });

      handleNext();
    } else {
      const expense = await createExpense(expenseData);

      setExpenseReceipt({
        ...expenseReceipt,
        expenseId: expense.id,
      });

      handleNext();
    }
  };

  const saveReceipt = async (e: any) => {
    e.preventDefault();

    var saveReceiptFormData = new FormData();
    saveReceiptFormData.set('expenseId', expenseReceipt.expenseId);

    let file = expenseReceipt.files;
    for (let i = 0; i < file.length; i++) {
      saveReceiptFormData.append(`file`, file[i]);
    }

    try {
      const response = await axios({
        method: 'post',
        url: 'http://localhost:3001/api/expense',
        data: saveReceiptFormData,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      await getExpense(expenseData.id || 0);

      handleNext();
    } catch (error) {}
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
      // updateUser(formData);
    }
  };

  const handleBack = () => {
    if (activeStep === 0) {
      onCancel();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
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
  return (
    <div>
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
            onClose={onCancel}
            aria-labelledby='simple-dialog-title'
            open={true}
          >
            <div className={classes.paper}>
              <h2 id='simple-modal-title' style={{ textAlign: 'center' }}>
                {edit ? 'Edit Expense' : 'New Expense'}
              </h2>

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
                      All steps completed - Expense has been submitted
                      succesfully
                    </Typography>
                    <Button onClick={onCancel} className={classes.button}>
                      Ok
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Typography className={classes.instructions}>
                      {(() => {
                        if (activeStep === 0)
                          return (
                            <ValidatorForm
                              className='expenseform'
                              onSubmit={saveExpense}
                            >
                              <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                  <TextValidator
                                    name='title'
                                    variant='outlined'
                                    required
                                    fullWidth
                                    id='title'
                                    label='Title'
                                    color='primary '
                                    value={title}
                                    onChange={(e) => onChange(e)}
                                    validators={['required']}
                                    errorMessages={['Title is required']}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <TextValidator
                                    name='description'
                                    variant='outlined'
                                    fullWidth
                                    id='description'
                                    color='primary '
                                    label='Description'
                                    onChange={(e) => onChange(e)}
                                    value={description}
                                  />
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <FormControl
                                    variant='filled'
                                    className='type'
                                    color='primary'
                                    fullWidth
                                    required
                                  >
                                    <InputLabel id='demo-simple-select-filled-label'>
                                      Type
                                    </InputLabel>
                                    <Select
                                      labelId='demo-simple-select-filled-label'
                                      id='demo-simple-select-filled'
                                      name='type'
                                      value={type}
                                      onChange={(e) => onChange(e)}
                                      fullWidth
                                      required
                                      color='primary'
                                    >
                                      <MenuItem value='Transport'>
                                        Transport
                                      </MenuItem>
                                      <MenuItem value='Food'>Food</MenuItem>
                                      <MenuItem value='Accomodation'>
                                        Accomodation
                                      </MenuItem>
                                      <MenuItem value='Training'>
                                        Training
                                      </MenuItem>
                                      <MenuItem value='Equipment'>
                                        Equipment
                                      </MenuItem>
                                      <MenuItem value='Other'>Other</MenuItem>
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                  <TextValidator
                                    id='amount'
                                    name='amount'
                                    label='Amount'
                                    variant='outlined'
                                    type='number'
                                    color='primary'
                                    required
                                    value={amount}
                                    onChange={(e) => onNumberChange(e)}
                                    validators={['required']}
                                    errorMessages={['Amount is required']}
                                    fullWidth
                                    // startAdornment={
                                    //   <InputAdornment position='start'>£</InputAdornment>
                                    // }
                                  />
                                </Grid>

                                <Button
                                  variant='contained'
                                  color='primary'
                                  type='submit'
                                  className={classes.button}
                                  style={{ float: 'right' }}
                                >
                                  {activeStep === steps.length - 1
                                    ? 'Finish'
                                    : 'Next'}
                                </Button>
                                <Button
                                  onClick={handleBack}
                                  className={classes.button}
                                  style={{ float: 'right' }}
                                >
                                  {activeStep === 0 ? 'Cancel' : 'Back'}
                                </Button>
                              </Grid>
                            </ValidatorForm>
                          );
                        if (activeStep === 1)
                          return (
                            <div>
                              <DropzoneArea
                                acceptedFiles={[
                                  'image/jpeg',
                                  'image/png',
                                  'image/bmp',
                                ]}
                                maxFileSize={5000000}
                                filesLimit={10}
                                onChange={handleRecieptChange}
                              />

                              <Button
                                variant='contained'
                                color='primary'
                                onClick={saveReceipt}
                                className={classes.button}
                                style={{ float: 'right' }}
                              >
                                {activeStep === steps.length - 1
                                  ? 'Finish'
                                  : 'Next'}
                              </Button>
                              <Button
                                disabled={true}
                                onClick={handleBack}
                                className={classes.button}
                                style={{ float: 'right' }}
                              >
                                {activeStep > 0 ? 'Back' : 'Cancel'}
                              </Button>
                            </div>
                          );
                        else;
                        return <span>Unknown Step</span>;
                      })()}
                    </Typography>
                    <div>
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
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Dialog>
        </Grid>
      </Grid>
    </div>
  );
}

export default observer(ExpenseModal);
