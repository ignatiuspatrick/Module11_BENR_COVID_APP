import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  textFieldInfo: {
    marginLeft: "15px"
  }
};

const useStyles = makeStyles(styles);

export default function ROInformation() {
  const classes = useStyles();

  const [businessname, setBusinessName] = React.useState('defaultvalue'); // get thru api
  const [city, setCity] = React.useState('defaultvalue'); // get thru api
  const [streetname, setStreetName] = React.useState('defaultvalue'); //get thru api
  const [number, setNumber] = React.useState('defaultvalue'); //get thru api
  const [postalcode, setPostalCode] = React.useState('defaultvalue'); //get thru api

  // for the backend
  function updateInfo() {

  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Information</h4>
              <p className={classes.cardCategoryWhite}>Information about your restaurant</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <TextField 
                  id="businessname" 
                  label="Restaurant Name"
                  defaultValue={businessname} 
                  fullWidth
                  onChange={(e) => setBusinessName(e.target.value)}
                  />
                  <TextField 
                  id="city" 
                  label="City"
                  defaultValue={city} 
                  fullWidth
                  onChange={(e) => setCity(e.target.value)}
                  />
                  <TextField 
                  id="streetname" 
                  label="Street Name"
                  defaultValue={streetname} 
                  fullWidth
                  onChange={(e) => setStreetName(e.target.value)}
                  />
                  <TextField
                  id="number"
                  label="Number"
                  type="number"
                  defaultValue={number}
                  fullWidth
                  onChange={(e) => setNumber(e.target.value)}
                  />
                  <TextField 
                  id="postalcode" 
                  label="Postal Code"
                  defaultValue={postalcode} 
                  fullWidth
                  onChange={(e) => setPostalCode(e.target.value)}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button 
              color="info"
              onClick={updateInfo}>
                Update Details
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
