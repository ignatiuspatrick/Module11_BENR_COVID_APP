import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// @material-ui/icon components
import InfoIcon from '@material-ui/icons/Info';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import back from "../../hosts.js";
import { useHistory } from "react-router-dom";

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
  },
  typoError: {
    height: "auto",
    marginLeft: "20px"
  }
};

const useStyles = makeStyles(styles);

export default function ROInformation() {
  const classes = useStyles();
  let history = useHistory();

  //fetched
  const [ownerid,setId] = React.useState(0);
  const [restid, setRestId] = React.useState(0);
  // fetched data to be displayed
  const [restname, setRestName] = React.useState('');
  const [streetname, setStreetName] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [postalcode, setPostalCode] = React.useState('');
  const [city, setCity] = React.useState('');

  //to be updated
  const [businessname, updateRestName] = React.useState(''); // get thru api
  const [newCity, updateCity] = React.useState(''); // get thru api
  const [newStreetname, updateStreetName] = React.useState(''); //get thru api
  const [newNumber, updateNumber] = React.useState(''); //get thru api
  const [newPostalcode, updatePostalCode] = React.useState(''); //get thru api
  const [errorflag, setErrorflag] = React.useState(0);

  // invoked when update button is clicked (since the button type is submit)
  const onFormSubmit = e => {
    e.preventDefault();
    updateInfo();
  }
  
  // invoked at the beginning of page rendering.
  React.useEffect(() => {
    async function getId(){
      // create request to get restaurant owner's id, parameters includes the uri and credentials for security.
      // parameters passed includes the uri and credentials (for security).
      const request = require('request');
      let options = {
        uri: back + '/superusers/getid',
        withCredentials: true
      };
      request.get(options,(err,res,body)=>{
        if (err) {
          return console.log(err);
        }
        if (res.statusCode === 200) {
          var obj = JSON.parse(body);
          setId(obj.id);
          // create request to get restaurant id as one restaurant unique identifier.
          // parameters passed includes the uri, credentials (for security), and owner id in the form to identify linked restaurant owner.
          const request2 = require('request');
          let options2 = {
            uri: back + '/restaurants/getrest',
            withCredentials: true,
            form: {
              ownerid: obj.id
            }
          }
          request2.post(options2,(err,res,body)=>{
            if (err) {
              return console.log(err);
            }
            if (res.statusCode === 200) {
              var obj = JSON.parse(body);
              // updates the new value for display
              setRestId(obj[0].id);
              setRestName(obj[0].name);
              setStreetName(obj[0].streetname);
              setNumber(obj[0].number);
              setPostalCode(obj[0].postalcode);
              setCity(obj[0].city);
              setErrorflag(0);
            }
          });
        }
      });
    }
    getId();
  },[]);

  // for the backend
  function updateInfo() {
    const request = require('request');
    // create request to set new business information.
    // parameters passed includes the uri, credentials (for security), and updated business (restaurant) information in the body.
    if(!businessname || !newStreetname || !newNumber || !newPostalcode || !newCity){
      setErrorflag("Please enter all details!");
    }else{
      let options = {
        uri: back + '/restaurants/' + restid,
        withCredentials:true,
        form: {
          name: businessname,
          streetname: newStreetname,
          number: newNumber,
          postalcode: newPostalcode,
          city: newCity,
          ownerid: ownerid
        }
      }
      request.put(options, (err,res,body)=>{
        if (err) {
          return console.log(err);
        }
        if (res.statusCode === 200) {
          setRestName(businessname);
          setStreetName(newStreetname);
          setNumber(newNumber);
          setPostalCode(newPostalcode);
          setCity(newCity);
        } else if (res.statusCode === 400) {
          var obj = JSON.parse(body);
          setErrorflag(obj.message);
        }else if (res.statusCode === 401){
          history.push('/login');
        }
      });
    }
    
  }

  // the function render the message after the user finished inputting new informations about their business.
  function getErrorMessage(){
    if (errorflag !== 0){
      return errorflag;
    }
  }

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={7}>
            <Card>
              <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Edit Information</h4>
                <p className={classes.cardCategoryWhite}>Information about your restaurant</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={6} sm={3} md={4}>
                    <TextField 
                    id="name" 
                    label="Business Name"
                    fullWidth
                    onChange={(e) => updateRestName(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={3} md={4}>
                    <TextField 
                    id="streetname" 
                    label="Street Name"
                    fullWidth
                    onChange={(e) => updateStreetName(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={3} md={4}>
                    <TextField
                    id="number"
                    label="Number"
                    fullWidth
                    onChange={(e) => updateNumber(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={3} md={4}>
                    <TextField 
                    id="postalcode" 
                    label="Postal Code"
                    fullWidth
                    onChange={(e) => updatePostalCode(e.target.value)}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={3} md={4}>
                  <TextField 
                    id="city" 
                    label="City"
                    fullWidth
                    onChange={(e) => updateCity(e.target.value)}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <Typography color='error' className={classes.typoError}>{getErrorMessage()}</Typography>
                <CardFooter>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="info"
                    className={classes.submit}
                  >
                    Update
                  </Button>
                </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={5}>
            <Card>
              <CardHeader color="info">
                <CardIcon color="info">
                  <InfoIcon />
                </CardIcon>
                <h4 className={classes.cardTitleWhite}>Information</h4>
                <p className={classes.cardCategoryWhite}>Displayed Information</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} style={{marginBottom: "10px"}}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Restaurant Name"
                      fullWidth
                      value={restname}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{marginBottom: "10px"}}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Street Name"
                      value={streetname}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{marginBottom: "10px"}}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Number"
                      value={number}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{marginBottom: "10px"}}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="Postal Code"
                      value={postalcode}
                      variant="outlined"
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6} style={{marginBottom: "10px"}}>
                    <TextField
                      disabled
                      id="outlined-disabled"
                      label="City"
                      value={city}
                      variant="outlined"
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </form>
    </div>
  );
}
