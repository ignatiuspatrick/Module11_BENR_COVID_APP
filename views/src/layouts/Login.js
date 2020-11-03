import React, { useState }  from 'react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";
import back from "../hosts.js";

// render the copyright component inside page footer.
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

// the function applies css to the rendered html page.
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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));

export default function SignInSide() {
  
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState(''); // username input 
  const [password, setPassword] = useState(''); // password input
  const [errorflag, setErrorflag] = useState(0); // indicates the type of error 
  const [value, setValue] = useState(0); // indicates the login type, where 0 stands for restaurant owner, and 1 stands for sanitary service.

  // handle value (login type) change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const onFormSubmit = e => {
    e.preventDefault();
    validityCheck();
  }

  // the function creates request to verify the credentials and redirect to the respective dashboard.
  function validityCheck() {
    const request = require('request');
    let options = {};
    if(value === 0){
      options = {
        uri: back + '/superusers/login',
        withCredentials: true,
        form: {
            username: username,
            password: password,
            type: 'restaurant_owner'
        }
      };
    } else if (value === 1) {
      options = {
        uri: back + '/superusers/login',
        withCredentials: true,
        form: {
            username: username,
            password: password,
            type: 'sanitary_service'
        }
      };
    }
    
    // redirect to the dashboard link
    function redirect() {
      if (value === 0) {
        history.push('/rodash/dashboard');
        } else if (value === 1) {
        history.push('/ssdash/dashboard');
      }
    }
    request.post(options, (err, res) => {
      if (err) {
          return console.log(err);
      }
      if (res.statusCode === 200) {
        localStorage.setItem('name', username);
        setErrorflag(0);
        redirect();
      } else if (username === '' || password === '') {
        setErrorflag(1); // error flag 1 stands for empty username nor password
      } else if (res.statusCode === 401){
        setErrorflag(2); // error flag 2 stands for wrong credentials or non existing users
      } else {
        setErrorflag(3); // error flag 3 stands for other type / unknown error, mostly related to backend error.
      }
    });
  }
  
  function getErrorMessage(){
    if (errorflag === 1) {
      return 'Please fill in both username and password.';
    } else if (errorflag === 2) {
      return 'Either username or password is incorrect';
    } else if (errorflag === 3){
      return 'Unknown error';
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
            Sign In
          </Typography>
          <Paper square className={classes.tabs}>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
              aria-label="icon label tabs example"
            >
              <Tab icon={<RestaurantIcon />} label="Business Owner" />
              <Tab icon={<LocalHospitalIcon />} label="Sanitary Service" />
            </Tabs>
          </Paper>
          <form className={classes.form} onSubmit={onFormSubmit}>
            <Typography color='error'>{getErrorMessage()}</Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs={6}>
                <Link href="/registerRo" variant="body2">
                  Register as Business Owner?
                </Link>
              </Grid>
              <Grid item xs={6} style={{textAlign: 'right'}}>
                <Link href="/registerSs" variant="body2">
                  Register as GGD?
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