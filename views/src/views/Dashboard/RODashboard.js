import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime"
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import back from "../../hosts.js";
import {
  dailySalesChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const [code, setCode] = React.useState('');
  const [errorflag, setErrorflag] = React.useState(0);

  const onFormSubmit = e => {
    e.preventDefault();
    registerPersonnel();
    e.target.reset();
  }

  // for the backend
  function deleteEmployee(pid) {
    return console.log("personnel deleted!");
  }

  function deleteButton(pid){
    return(
      <IconButton 
        color="inherit" 
        aria-label="alert restaurant" 
        component="span"
        onClick={() => deleteEmployee(pid)}>
            <HighlightOffIcon />
        </IconButton>
    );
  }

  // for the backend
  function registerPersonnel() {
    if(!code || code.length!==8){
      setErrorflag("Please provide a valid code!");
    }else{
    const request = require('request');
    let options = {
      uri: back + '/superusers/getid',
      withCredentials: true
    };
    var ownerid = 0;
    var restid = 0;
    var name = '';
    var streetname = '';
    var number = '';
    var postalcode = '';
    var city = '';

    request.get(options,(err,res,body)=>{
      if (err) {
        return console.log(err);
      }
      if(res.statusCode === 200){
        var obj=JSON.parse(body);
        ownerid = obj.id;
        const request2 = require('request');
        let options2 = {
          uri: back + '/restaurants/getrestcode',
          withCredentials: true,
          form: {
            ownerid: ownerid
          }
        }
      request2.post(options2,(err,res,body)=>{
        if (err) {
          return console.log(err);
        }
        if(res.statusCode === 200){
          var obj = JSON.parse(body);
          restid = obj[0].id;
          // display in dashboard this data 
          name = obj[0].name;
          streetname = obj[0].streetname;
          number = obj[0].number;
          postalcode = obj[0].postalcode;
          city = obj[0].city;
          // not finished, sql query in back end not correct
          const request3 = require('request');
          let options3 = {
            uri: back + '/superusers/linkpersonnel/' + code + '/' + restid,
            withCredentials:true
          }
          request3.post(options3,(err,res,body)=>{
            if (err) {
              return console.log(err);
            }
            if(res.statusCode === 200){
              setErrorflag("Registered personnel with code: ");
            }else if (res.statusCode === 400){
              var obj = JSON.parse(body);
              setErrorflag(obj.message);
            }
          });
        }
      });
    }
    });
  }

  }
  function getErrorMessage(){
    if(errorflag!==0){
      return errorflag;
    }
  }
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Current Visitors</p>
              <h3 className={classes.cardTitle}>
                51/50 <small>visitors</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  There might be too many visitors now.
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Occupied Tables</p>
              <h3 className={classes.cardTitle}>
                28/30 <small>tables</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago.
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Past Visitors</p>
              <h3 className={classes.cardTitle}>37</h3>
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="info">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
              <ButtonGroup color="inherit" aria-label="outlined primary button group" size="small" style={{marginLeft: 20}}>
                <Button>Week</Button>
                <Button>Month</Button>
                <Button>Year</Button>
              </ButtonGroup>
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Visitors Chart</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today's visitors.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Recent Visits</h4>
              <p className={classes.cardCategoryWhite}>
                29th September, 2020
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={["Check In", "Check Out"]}
                tableData={[
                  ["13.00","15.00"],
                  ["14.00","16.00"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
            <Card>
                <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>RPM</h4>
                    <p className={classes.cardCategoryWhite}>
                        Restaurant Personnel Manager
                    </p>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={5}>
                        <Card>
                          <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Register Restaurant Personnel</h4>
                          </CardHeader>
                          <CardBody>
                            <form className={classes.form} onSubmit={onFormSubmit}>
                            <TextField id="outlined-basic" label="Enter Personnel Code" variant="outlined" helperText="8 Digits"onChange={(e) => setCode(e.target.value)}/>
                            <Button className={classes.submit} variant="contained" type="submit">
                                Register
                            </Button>
                            <Typography color='error'>{getErrorMessage()}</Typography>
                            </form>
                          </CardBody>
                        </Card>
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <Card>
                          <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Registered Personnels</h4>
                            <p className={classes.cardCategoryWhite}>
                                Personnels who has access to scan QR-codes from visitors
                            </p>
                          </CardHeader>
                          <CardBody>
                            <Table
                                tableHeaderColor="info"
                                tableHead={["Personnel ID", "Name", "Delete"]}
                                tableData={[
                                ["001","Ignatius Patrick", deleteButton(0)],
                                ["002","Konstantinas Averkin", deleteButton(1)]
                                ]}
                            />
                          </CardBody>
                        </Card>
                      </GridItem>
                    </GridContainer>
                </CardBody>
            </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
