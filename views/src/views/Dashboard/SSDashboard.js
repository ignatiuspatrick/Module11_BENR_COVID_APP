import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AlarmAdd from '@material-ui/icons/AlarmAdd';
import WarningIcon from '@material-ui/icons/Warning';
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime"
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import DialogSelect from 'components/DialogSelect/DialogSelect.js'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import nlAPI from 'nl.json';

import {
  dailySalesChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

// backend work
function remindRestaurant(rid) {
    return console.log("restaurant reminded!");
}

function copyright(restoid) {
    return(
        <IconButton 
        color="inherit" 
        aria-label="alert restaurant" 
        component="span"
        onClick={() => remindRestaurant(restoid)}>
            <NotificationImportantIcon />
        </IconButton>
    );
}

export default function SSDashboard() {
  const classes = useStyles();

  const [displayedcity, setDisplayedCity] = React.useState('Enschede');

  //for the backend
  function notifyPeers(){
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AlarmAdd />
              </CardIcon>
              <p className={classes.cardCategory}>Confirmed Case</p>
              <h3 className={classes.cardTitle}>
                140<small>K</small>
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
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <WarningIcon />
              </CardIcon>
              <p className={classes.cardCategory}>New Cases</p>
              <h3 className={classes.cardTitle}>+4572<small>cases</small></h3>
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
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Deaths</p>
              <h3 className={classes.cardTitle}>
                6.4<small>K</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago.
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
                        <TextField id="outlined-basic" label="Enter GGD Code" variant="outlined" helperText="8 Digits"/>
                        <Button className={classes.notifyButton} variant="contained" onClick={notifyPeers}>
                            Notify
                        </Button>
                    </CardBody>
                </Card>
          </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
            <Card>
                <CardHeader color="danger">
                    <DialogSelect title="Select City"
                    dialogTitle="Pick a City"
                    cat1="Province"
                    cat2="City"
                    collection={nlAPI}/>
                </CardHeader>
                <CardBody>
                    <GridContainer>
                        <GridItem xs={12} sm={12} md={6}>
                            <Card>
                                <CardHeader color="danger">
                                    <h4 className={classes.cardTitleWhite}>Recent Notifications</h4>
                                    <p className={classes.cardCategoryWhite}>
                                        Restaurants with COVID-19 Cases
                                    </p>
                                </CardHeader>
                                <CardBody>
                                <Table
                                    tableHeaderColor="danger"
                                    tableHead={["Date", "Restaurant", "City","Reminded","Remind"]}
                                    tableData={[
                                    ["6th of October","Stanislaus Brewkovich", "Enschede","Yes", copyright(0)],
                                    ["7th of October","Gouderegentstraat 10", "Enschede","No", copyright(1)]
                                    ]}
                                />
                                </CardBody>
                            </Card>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                            <Card chart>
                                <CardHeader color="danger">
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
                                    <h4 className={classes.cardTitle}>Number of restaurants with COVID-19</h4>
                                    <p className={classes.cardCategory}>
                                        <span className={classes.successText}>
                                        <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                                        </span>{" "}
                                        increase in number of notified restaurants.
                                    </p>
                                </CardBody>
                                <CardFooter chart>
                                    <div className={classes.stats}>
                                        <AccessTime /> updated 7 minutes ago
                                    </div>
                                </CardFooter>
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
