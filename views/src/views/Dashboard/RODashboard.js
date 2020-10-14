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

import {
  dailySalesChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  // for the backend
  function registerPersonnel() {

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
                            <TextField id="outlined-basic" label="Enter Personnel Code" variant="outlined" helperText="6 Digits"/>
                            <Button className={classes.registerPersonnelButton} variant="contained" onClick={registerPersonnel}>
                                Register
                            </Button>
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
                                ["001","Ignatius Patrick", "delete button"],
                                ["002","Konstantinas Averkin", "delete button"]
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
