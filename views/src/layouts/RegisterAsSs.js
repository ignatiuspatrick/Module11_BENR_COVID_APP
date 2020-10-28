import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import back from "../hosts.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.mindhash.nl/">
        Mindhash BV.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundColor: '#fe7d55'
  },
  tabs: {
    flexGrow: 1,
    maxWidth: 500,
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#fe7d55',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));



export default function SignUpSide() {
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, confirmPassword] = React.useState('');
  const [errorflag, setErrorflag] = React.useState(0);
  const onFormSubmit = e => {
    e.preventDefault();
    submitRegistration();
  }

  function submitRegistration() {
    const request = require('request');
    let options = {};
    options = {
      url: back + '/superusers/create',
      form: {
          username: username,
          password: password,
          confirm: passwordConfirm,
          email:email,
          type: "sanitary_service"
      }
  };
  
  request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    if (res.statusCode === 200) {
        history.push('/login');
    }else if(res.statusCode === 400 || res.statusCode === 401){
      var obj=JSON.parse(body)
      console.log(obj.message)
      setErrorflag(obj.message);
    }
  });

  }
  function getErrorMessage(){
    if(errorflag!==0){
      return errorflag;
    }
  }

  return (
    <Grid container component="main" direction="row" justify="center" alignItems="center" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={onFormSubmit}>
          <Typography color='error'>{getErrorMessage()}</Typography>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                      autoComplete="email"
                      name="name"
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Your email address"
                      onChange={(e) => setEmail(e.target.value)}
                      helperText="Enter your email address."
                      autoFocus
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                      autoComplete="fname"
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      onChange={(e) => setUsername(e.target.value)}
                      helperText="Enter your username"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText="At least 8 character long with at least one uppercase letter, special character, and a number."
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Confirm password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        helperText="Enter the same password again."
                        onChange={(e) => confirmPassword(e.target.value)}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Register
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="/login" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}