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

interface UserModalProps {
  user?: IUser;
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

export interface IUserModalState {
  id?: number;
  name: String;
  email: String;
  password?: String;
  cfPassword?: String;
  jobTitle: String;
  userType?: String;
  department: String;
  managerId?: number;
  companyId?: number;
}
function UsersModal(props: UserModalProps) {
  const classes = useStyles();

  ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
    if (value !== userData.password) {
      return false;
    }
    return true;
  });

  const companyStore = useContext(CompanyStore);
  const { companies, getCompanies } = companyStore;

  const userStore = useContext(UserStore);
  const { createUser, updateUser } = userStore;
  const { edit, user, onCancel } = props;

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

  const renderCompaniesSelectOptions = () => {
    return companies.map((company: any) => {
      return (
        <MenuItem key={company.id} value={company.id}>
          {company.name}
        </MenuItem>
      );
    });
  };

  // const onNumberChange = (e: any) => {
  //   setCompanyData({
  //     ...companyData,
  //     [e.target.name]:
  //       e.target.type === 'number' ? parseInt(e.target.value) : e.target.value,
  //   });
  // };

  const saveUser = async (e: any) => {
    e.preventDefault();

    if (edit) {
      await updateUser(userData);
      onCancel();
    } else {
      await createUser(userData);
      onCancel();
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
                {edit ? 'Edit User' : 'New User'}
              </h2>

              <ValidatorForm className='signUpForm' onSubmit={saveUser}>
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
                    <FormControl
                      variant='filled'
                      className='userType'
                      color='primary'
                      fullWidth
                      required
                      disabled
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
                        <MenuItem value='SeniorManagement'>
                          <em>Senior Management</em>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
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
                        <MenuItem value='General Management'>
                          General Management
                        </MenuItem>
                        <MenuItem value='HR'>HR</MenuItem>

                        <MenuItem value='Research and Development'>
                          Research And Development
                        </MenuItem>
                        <MenuItem value='Production'>Production</MenuItem>
                        <MenuItem value='Marketing'>Marketing</MenuItem>
                        <MenuItem value='Finance'>Finance</MenuItem>
                        <MenuItem value='Other'>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

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
                      {companies.length > 0 ? (
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
                      ) : null}
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
                  )}

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

export default observer(UsersModal);
