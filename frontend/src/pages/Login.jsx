import React from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styled from 'styled-components';
import axios from 'axios';

const SubmitButton = styled(Button)`
  ${({ theme }) => `
margin-top: ${theme.spacing(2)}px !important;
`}
`;

const Login = () => {
  const formSubmitHandler = async event => {
    event.preventDefault();
    const {username, email, password} = event.target.elements;
    const response = await axios.post('http://localhost:1337/auth/local/register', {
        username: username.value,
        email: email.value,
        password: password.value,
    })
    console.log(response);

  };
  return (
    <Grid container spacing={4} justify="center">
      <form onSubmit={formSubmitHandler}>
        <Grid item>
          <TextField required id="username" name="username" pattern=".{3,}" type="text" label="Username" />
        </Grid>
        <Grid item>
          <TextField required id="email" name="email" type="email" label="Email" />
        </Grid>
        <Grid item>
          <TextField required name="password" id="password" type="password" inputProps={{pattern: '.{6,}', required: true, title: "Must contain at least 6 characters"}} label="Password" title="Must contain at least 6 characters"/>
        </Grid>
        <Grid item>
          <SubmitButton type="submit" fullWidth variant="outlined" color="primary" endIcon={<PersonAddIcon />}>
            Create account
          </SubmitButton>
        </Grid>
      </form>
    </Grid>
  );
};

export default Login;
