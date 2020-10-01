import React, { useState }  from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.google.com/search?q=mindhash+bv&oq=mindhash&aqs=chrome.1.69i57j35i39j0l3j69i61l3.2853j0j7&sourceid=chrome&ie=UTF-8">
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

export default function SignInSide() {
  
  const classes = useStyles();
  let history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorflag, setErrorflag] = useState(0);
  const [value, setValue] = useState(0);



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  
  function validityCheck() {
    const request = require('request');
    let options = {};
    console.log(value);
    if(value === 0){
      options = {
        url: 'http://localhost:5000/superusers/login',
        form: {
            username: username,
            password: password,
            type: 'restaurant_owner'
        }
    };
    }else if(value === 1){
      options = {
        url: 'http://localhost:5000/superusers/login',
        form: {
            username: username,
            password: password,
            type: 'sanitary_service'
        }
    };
    }
  
  request.post(options, (err, res, body) => {
    if (err) {
        return console.log(err);
    }
    if (res.statusCode === 200) {
      setErrorflag(0);
      history.push('/admin/dashboard');
    }
    else if (username === '' || password === '') {
      setErrorflag(1);
    }else if (res.statusCode === 401){
      setErrorflag(2);
    }
    else {
      setErrorflag(3);
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
              <Tab icon={<RestaurantIcon />} label="Restaurant Owner"/>
              <Tab icon={<LocalHospitalIcon />} label="Sanitary Services" />
            </Tabs>
          </Paper>
          <form className={classes.form} noValidate>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => validityCheck()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Register your restaurant? Sign Up"}
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