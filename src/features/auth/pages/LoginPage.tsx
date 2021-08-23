import { Box, Button, CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import * as React from 'react';
import { authActions } from '../authSlice';

export interface LoginPageProps {
}

const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexFlow: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(2)
  }
}))

export default function LoginPage (props: LoginPageProps) {
  const classes = useStyle()
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(state => state.auth.logging)

  const handleLoginClick = () => {
    dispatch(authActions.login({
      username: '', 
      password: '',
    }))
  }
  const handleLogoutClick = () => {
    dispatch(authActions.logout())
  }
  
  return (
    <div className={classes.root}>
      <Button variant="contained" color="secondary" onClick={handleLogoutClick}>Logout</Button>
      <Paper elevation={1} className={classes.paper}>
        <Typography variant="h5" component="h1">Management</Typography>
        <Box mt={4}>
          <Button fullWidth variant="contained" color="primary" onClick={handleLoginClick}>
            {isLoggedIn && <CircularProgress size={20} color="secondary"/>}
            &nbsp; Login
          </Button>
        </Box>
      </Paper>
    </div>
  );
}
