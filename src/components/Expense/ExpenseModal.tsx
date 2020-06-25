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
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react-lite';
import { UserContext } from '../../userContext';
import { IExpense } from '../../models/Expense';
import ExpenseStore from '../../MobX/store/ExpenseStore';

interface ExpenseModalProps {
  expense?: IExpense;
  edit?: boolean;
  onCancel: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

export interface ExpenseModalState {
  id?: number;
  title: String;
  description?: String;
  type: String;
  amount?: number;
}

function ExpenseModal(props: ExpenseModalProps) {
  const classes = useStyles();

  const { userAuthData, setUserAuthData } = useContext(UserContext);

  const expenseStore = useContext(ExpenseStore);
  //   const { createExpense } = expenseStore;

  const { edit, expense, onCancel } = props;

  const [expenseData, setExpenseData] = useState<ExpenseModalState>({
    id: expense?.id || undefined,
    title: expense?.title || '',
    description: expense?.description || '',
    type: expense?.type || '',
    amount: expense?.amount || undefined,
  });

  // Destructuring
  const { id, title, description, type, amount } = expenseData;

  const onChange = (e: any) => {
    setExpenseData({
      ...expenseData,
      [e.target.name]: e.target.value,
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
      //   await updateUser(userData);
      //   onCancel();
    } else {
      //   await createExpense(expenseData);
      //   onCancel();
      console.log(expenseData);
    }
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

              <ValidatorForm className='expenseform' onSubmit={saveExpense}>
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
                      required
                      fullWidth
                      id='description'
                      color='primary '
                      label='Description'
                      onChange={(e) => onChange(e)}
                      value={description}
                      validators={['required']}
                      errorMessages={['Description is required']}
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
                        <MenuItem value='Transport'>Transport</MenuItem>
                        <MenuItem value='Food'>Food</MenuItem>
                        <MenuItem value='Accomodation'>Accomodation</MenuItem>
                        <MenuItem value='Training'>Training</MenuItem>
                        <MenuItem value='Equipment'>Equipment</MenuItem>
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
                      type='submit'
                      onClick={onCancel}
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

export default observer(ExpenseModal);
