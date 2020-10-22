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

// backend work

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

  // for stats
  var counter = new Date(today.getFullYear, today.getMonth, 0).getDate();

  var recentnotiftablehead = ["City", "Marked Users"];
  var recentnotiftabledata = [
    ["Enschede", "100"],
    ["Utrecht", "99"]
    ];

  const onFormSubmit = e => {
    e.preventDefault();
    markInfectedUser();
    e.target.reset();
  }

  //for the backend
  function markInfectedUser(){
    const request = require('request');
    let options = {};
    console.log(code);
    options = {
      uri: back + '/superusers/markinfected',
      withCredentials: true,
      form: {
          code:code
      }
    };
    request.post(options,(err,res,body) => {
      var obj=JSON.parse(body);
      if (err) {
        return console.log(err);
    } 
    if(res.statusCode === 200) {
      console.log(obj.success);
      setErrorflag("Marked user: " + code);
    }else {
      console.log(obj.message);
      setErrorflag("Error! " + obj.message);
    }
    });
  }

  function getTotMarkedUsers(range) {
    console.log("range: " + range);
    const request = require('request');
    let options = {
      uri: back + '/users/getMarked',
      withCredentials: true,
      form: {
        days: range
      }
    };
    request.post(options,(err,res,body)=>{
      var obj=JSON.parse(body);
      if (err) {
        return console.log(err);
      }
      if(res.statusCode === 200){
        console.log(obj.result);
        setTotMarkedUsers(obj.result);
      } 
    });
  }

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
                  <Button>Today</Button>
                  <Button>Week</Button>
                  <Button>Month</Button>
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
              <TextField id="outlined-basic" label="Enter GGD Code" variant="outlined" helperText="8 Digits" onChange={(e) => setCode(e.target.value)}/>
              <Button type="submit" variant="contained" className={classes.notifyUserButton}>
                  Notify
              </Button>
              <Typography color='error'>{getErrorMessage()}</Typography>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
