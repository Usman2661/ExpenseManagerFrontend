import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';
import { IUser } from '../models/User';
import axios from 'axios';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo';
import { GET_USERS } from '../graphQL/query';

interface IRegisterState {
  name: String;
  email: String;
  password: String;
  cfPassword: String;
  jobTitle: String;
  department: String;
}

interface IRegisterProps {}
export class Register extends React.Component<IRegisterProps, IRegisterState> {
  constructor(props: any) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      jobTitle: '',
      department: '',
      cfPassword: '',
    };
  }

  componentDidMount() {
    const { loading, error, data } = useQuery(GET_USERS);

    console.log(data);
  }
  private registerUser = async (e: any) => {
    const {
      name,
      email,
      password,
      jobTitle,
      department,
      cfPassword,
    } = this.state;

    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/',
        {
          query: `mutation createUser($email: String!, $jobTitle: String! , $password:String! ,$name:String! , $department:String! ) {
            createUser(email: $email, jobTitle: $jobTitle,password: $password, name: $name,department: $department){
            id
            name, 
            email, 
            department,
            jobTitle,
            department
          }
        }`,
          variables: {
            name,
            email,
            password,
            jobTitle,
            department,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response.data);
      console.log(response.data.data.createUser);
    } catch (error) {
      console.error(error);
    }
  };

  private onChange = (e: any) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value,
    });
  };
  render() {
    const {
      name,
      email,
      password,
      jobTitle,
      department,
      cfPassword,
    } = this.state;
    return (
      <div>
        <div className='registerForm'>
          <Grid container justify='center' alignItems='center'>
            <Grid item xs={12} sm={8} md={6}>
              <Paper className='registration'>
                <Card className='registerCard '>
                  <CardContent>
                    <div style={{ marginLeft: '40%' }}>
                      {' '}
                      {/* <Avatar className='signUpIcon'>
                      <AccountBoxIcon />
                    </Avatar> */}
                      <h1> Sign Up </h1>
                    </div>
                    <form className='signUpForm'>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            name='name'
                            variant='outlined'
                            required
                            fullWidth
                            id='name'
                            label='Name'
                            color='secondary'
                            value={name}
                            onChange={this.onChange}
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
                            color='secondary'
                            label='Job Title'
                            onChange={this.onChange}
                            value={jobTitle}
                            autoFocus
                          />
                        </Grid>

                        <Grid item xs={12} sm={12}>
                          <FormControl
                            variant='filled'
                            className='deparment'
                            color='secondary'
                            fullWidth
                          >
                            <InputLabel id='demo-simple-select-filled-label'>
                              Department
                            </InputLabel>
                            <Select
                              labelId='demo-simple-select-filled-label'
                              id='demo-simple-select-filled'
                              name='department'
                              value={department}
                              onChange={this.onChange}
                              fullWidth
                              color='secondary'
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
                          <TextField
                            id='email'
                            name='email'
                            label='Email'
                            variant='outlined'
                            type='email'
                            color='secondary'
                            value={email}
                            onChange={this.onChange}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            id='password'
                            name='password'
                            label='Password'
                            variant='outlined'
                            type='password'
                            color='secondary'
                            value={password}
                            onChange={this.onChange}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <TextField
                            id='cfPassword'
                            name='cfPassword'
                            label='Confirm Password'
                            variant='outlined'
                            type='password'
                            color='secondary'
                            value={cfPassword}
                            onChange={this.onChange}
                            required
                            fullWidth
                          />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Button
                            variant='contained'
                            color='secondary'
                            type='submit'
                            fullWidth
                            onClick={this.registerUser}
                          >
                            Sign Up
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={12}>
                          <Link to='/'>Already have an account? Sign in</Link>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>
                  <CardActions></CardActions>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Register;
