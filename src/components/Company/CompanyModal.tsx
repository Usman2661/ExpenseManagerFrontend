import React, { useState } from 'react';
import { ICompany } from '../../models/Company';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

interface CompanyModalProps {
  company?: ICompany;
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

export default function CompanyModal(props: CompanyModalProps) {
  const classes = useStyles();

  const [companyData, setCompanyData] = useState({
    name: '',
    addressFirstLine: '',
    addressSecondLine: '',
    addressThirdLine: '',
    postcode: '',
    phone: null,
    businessArea: '',
    registerYear: null,
  });

  // Destructuring
  const {
    name,
    addressFirstLine,
    addressSecondLine,
    addressThirdLine,
    postcode,
    phone,
    businessArea,
    registerYear,
  } = companyData;

  const onChange = (e: any) => {
    setCompanyData({ ...companyData, [e.target.name]: e.target.value });
  };

  const saveCompany = async (e: any) => {
    e.preventDefault();
  };
  const { edit, company, onCancel } = props;
  return (
    <div>
      <Modal
        open={true}
        onClose={onCancel}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Grid
          className='companyModalGrid'
          container
          direction='row'
          justify='center'
          alignItems='center'
          style={{ margin: 0, width: '100%' }}
        >
          <Grid item xs={12} sm={10} md={8} lg={6}>
            <div className={classes.paper}>
              <h2 id='simple-modal-title' style={{ textAlign: 'center' }}>
                Company
              </h2>
              <ValidatorForm className='signUpForm' onSubmit={saveCompany}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      name='name'
                      variant='outlined'
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

                  <Grid item xs={12} sm={12}>
                    <TextValidator
                      name='businessArea'
                      variant='outlined'
                      fullWidth
                      id='jobTitle'
                      color='primary '
                      label='Business Type'
                      onChange={(e) => onChange(e)}
                      value={businessArea}
                      validators={['required']}
                      errorMessages={['Business Type is required']}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='addressFirstLine'
                      name='addressFirstLine'
                      label='Address First Line'
                      variant='outlined'
                      color='primary '
                      value={addressFirstLine}
                      onChange={(e) => onChange(e)}
                      validators={['required']}
                      errorMessages={['Addres First Line is required']}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='addressSecondLine'
                      name='addressSecondLine'
                      label='Address Second Line'
                      variant='outlined'
                      color='primary '
                      value={addressSecondLine}
                      onChange={(e) => onChange(e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='addressThirdLine'
                      name='addressThirdLine'
                      label='Address Third Line'
                      variant='outlined'
                      color='primary '
                      value={addressThirdLine}
                      onChange={(e) => onChange(e)}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='postcode'
                      name='postcode'
                      label='Postcode'
                      variant='outlined'
                      color='primary '
                      value={postcode}
                      onChange={(e) => onChange(e)}
                      validators={['required']}
                      errorMessages={['Postcode is required']}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='phone'
                      name='phone'
                      label='Phone'
                      variant='outlined'
                      color='primary '
                      value={phone}
                      onChange={(e) => onChange(e)}
                      validators={['required']}
                      errorMessages={['Phone is required']}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextValidator
                      id='registerYear'
                      name='registerYear'
                      label='Company Registration Year'
                      variant='outlined'
                      color='primary '
                      value={registerYear}
                      onChange={(e) => onChange(e)}
                      validators={['required']}
                      errorMessages={['Registeration Year is required']}
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
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
}
