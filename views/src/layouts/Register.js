import React from 'react';
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
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
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
    height: '150vh',
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

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phonenumber, setPhoneNumber] = React.useState('');
  const [city, setCity] = React.useState('');
  const [streetname, setStreetName] = React.useState('');
  const [housenumber, setHouseNumber] = React.useState('');
  const [postalcode, setPostalCode] = React.useState('');
  const [registertype, setRegisterType] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [tnc, setTnc] = React.useState(false)

  //backend integration
  function submitRegistration() {
    
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
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      onChange={(e) => setFirstname(e.target.value)}
                      error={firstname.length < 1}
                      helperText="Enter first name"
                      autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                      helperText="Enter last name"
                      error={lastname.length < 1}
                      onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      helperText="Enter valid email"
                      error={email.length < 1}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="phonenumber"
                      label="Phone Number"
                      name="phoneNumber"
                      helperText="Enter valid phone number"
                      error={phonenumber.length < 1}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="city"
                      label="City"
                      name="city"
                      helperText="Enter valid city"
                      error={city.length < 1}
                      onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="streetname"
                      label="Street Name"
                      name="streetName"
                      helperText="Enter valid street name"
                      error={streetname.length < 1}
                      onChange={(e) => setStreetName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="housenumber"
                      label="House Number"
                      name="houseNumber"
                      helperText="Enter valid house number"
                      error={housenumber.length < 1}
                      onChange={(e) => setHouseNumber(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="postalcode"
                      label="Postal Code"
                      name="postalCode"
                      helperText="Enter valid postal code"
                      error={postalcode.length < 1}
                      onChange={(e) => setPostalCode(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RadioGroup 
                    aria-label="gender" 
                    name="gender1"
                    onChange={(e) => setRegisterType} 
                    row>
                    <FormControlLabel value="restaurant_owner" control={<Radio />} label="Restaurant Owner" />
                    <FormControlLabel value="sanitary_service" control={<Radio />} label="Sanitary Service" />
                  </RadioGroup>
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
                        helperText="Enter valid password"
                        error={password.length < 1}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                {/* confirm password */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="tnc" color="primary" onChange={ (e) => setTnc(e.target.checked)}/>}
                        label="I agree to the terms and conditions."
                    />
                    {tnc ? "" : <Typography color='error'>Please read our terms and conditions before proceeding with the registration.</Typography>}
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={submitRegistration()}
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