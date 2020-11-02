import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// @material-ui/icons
import AlarmAdd from '@material-ui/icons/AlarmAdd';
import WarningIcon from '@material-ui/icons/Warning';
import DateRange from "@material-ui/icons/DateRange";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import back from "../../hosts.js";
import Typography from '@material-ui/core/Typography';

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function SSDashboard() {
  const classes = useStyles();

  const [code, setCode] = React.useState('');
  const [errorflag, setErrorflag] = React.useState(0);
  const [totmarkedusers, setTotMarkedUsers] = React.useState(0); // backend invocation
  const [totimpactedresto, setTotImpactedResto] = React.useState(0); // backend invocation
  const username = localStorage.getItem('name');

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = today.toLocaleString('default', { month: 'long' });
  var yyyy = today.getFullYear();

  // current time display
  var counter = new Date(today.getFullYear, today.getMonth, 0).getDate();

  const onFormSubmit = e => {
    e.preventDefault();
    markInfectedUser();
    e.target.reset();
  }

  // the function marks a user in case he or she gets infected
  function markInfectedUser(){
    // create request to set infected user using their GGD code, parameters includes the uri and credentials for security.
    // parameters passed includes the uri, credentials (for security), and the GGD code inside the body (form).
    const request = require('request');
    let options = {};
    options = {
      uri: back + '/superusers/markinfected',
      withCredentials: true,
      form: {
          code: code
      }
    };
    request.post(options,(err,res,body) => {
      var obj = JSON.parse(body);
      if (err) {
        return console.log(err);
    } 
    // set message to display after marking the user
    if (res.statusCode === 200) {
      setErrorflag("Marked user: " + code); // indicates successful operation.
    } else {
      setErrorflag("Error! " + obj.message); // indicates failed operation and the error, e.g. invalid code.
    }
    });
  }

  // the function gets the total number whose ggd code is marked as infected.
  // @ param: range = (int) range of days for number of marked user, e.g. 0 for today, 1 for today and yesterday, 6 for the past week, etc.
  function getTotMarkedUsers(range) {
    // create request to get the total number infected user where parameters include the uri, credentials for security, and in the body the day range.
    // parameters passed includes the uri, credentials (for security), and the range of days inside the body (form).
    const request = require('request');
    let options = {
      uri: back + '/superusers/marked',
      withCredentials: true,
      form: {
        days: range
      }
    };
    request.post(options,(err,res,body) => {
      var obj = JSON.parse(body);
      if (err) {
        return console.log(err);
      }
      if (res.statusCode === 200) {
        setTotMarkedUsers(obj.result); // display the result in the rendered html.
      } 
    });
  }

  // the function gets the total number of restaurants with visitor(s) whose ggd code is marked as infected.
  // @ param: days = (int) range of days for number of infected restaurants, e.g. 0 for today, 1 for today and yesterday, 6 for the past week, etc.
  function getTotImpactedResto(days) {
    // create request to get the total number of restaurants where parameters include the uri, credentials for cookie, and in the body the day range.
    // parameters passed includes the uri, credentials (for security), and the range of days inside the body (form).
    const request = require('request');
    let options = {
      uri: back + '/superusers/infectedrestaurants',
      withCredentials: true,
      form: {
        days: days
      }
    };
    request.post(options,(err,res,body) => {
      var obj=JSON.parse(body);
      if (err) {
        return console.log(err);
      }
      if(res.statusCode === 200){
        setTotImpactedResto(obj.result);
      } 
    });
  }

  // the function render the message after marking users by their ggd code
  function getErrorMessage(){
    if (errorflag !== 0){
      return errorflag;
    }
  }

  return (
    <div>
      <h3>Welcome, {username}!</h3>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AlarmAdd />
              </CardIcon>
              <p className={classes.cardCategory}>Total Marked Users</p>
              <h3 className={classes.cardTitle}>
                {totmarkedusers}
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <ButtonGroup color="inherit" aria-label="outlined primary button group" size="small" style={{marginLeft: 10}}>
                  <Button onClick={() => getTotMarkedUsers(0)}>Today</Button>
                  <Button onClick={() => getTotMarkedUsers(6)}>Week</Button>
                  <Button onClick={() => getTotMarkedUsers(30)}>Month</Button>
                </ButtonGroup>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <WarningIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Impacted Restaurants</p>
              <h3 className={classes.cardTitle}>{totimpactedresto}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <ButtonGroup color="inherit" aria-label="outlined primary button group" size="small" style={{marginLeft: 10}}>
                  <Button onClick={()=> getTotImpactedResto(0)}>Today</Button>
                  <Button onClick={()=> getTotImpactedResto(6)}>Week</Button>
                  <Button onClick={()=> getTotImpactedResto(30)}>Month</Button>
                </ButtonGroup>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={5}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Mark Infected User</h4>
            </CardHeader>
            <CardBody>
              <form className={classes.form} onSubmit={onFormSubmit}>
                <GridContainer>
                  <GridItem xs={6}>
                    <TextField id="outlined-basic" label="Enter GGD Code" variant="outlined" helperText="Length 8" onChange={(e) => setCode(e.target.value)}/>
                  </GridItem>
                  <GridItem xs={6}>
                    <Button type="submit" variant="contained" className={classes.notifyUserButton}>
                      Notify
                    </Button>
                  </GridItem>
                </GridContainer>
                <Typography color='error'>{getErrorMessage()}</Typography>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
