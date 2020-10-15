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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

  const onFormSubmit = e => {
    e.preventDefault();
    updateInfo();
  }
  
  React.useEffect(()=>{
    async function getId(){
      const request = require('request');
      let options = {
        uri: back + '/superusers/getid',
        withCredentials: true
      };
      request.get(options,(err,res,body)=>{
        if (err) {
          return console.log(err);
        }
        if(res.statusCode === 200){
          var obj=JSON.parse(body);
          setId(obj.id);
          // var ownerid = obj.id;
          // localStorage.setItem('ownerid',ownerid);
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
          if(res.statusCode === 200){
            var obj = JSON.parse(body);
            setRestId(obj[0].id);
            // display in dashboard this data 
            setRestName(obj[0].name);
            setStreetName(obj[0].streetname);
            setNumber(obj[0].number);
            setPostalCode(obj[0].postalcode);
            setCity(obj[0].city);
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
      history.push("/rodash/restoinfo");
    }
    });
  }

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} >
          <Card>
          <form className={classes.form} onSubmit={onFormSubmit}>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Edit Information</h4>
              <p className={classes.cardCategoryWhite}>Information about your restaurant</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              
                <GridItem xs={12} sm={12} md={4}>
                  <TextField 
                  id="name" 
                  label="Restaurant Name"
                  fullWidth
                  onChange={(e) => updateRestName(e.target.value)}
                  />
                  <TextField 
                  id="streetname" 
                  label="Street Name"
                  fullWidth
                  onChange={(e) => updateStreetName(e.target.value)}
                  />
                  <TextField
                  id="number"
                  label="Number"
                  fullWidth
                  onChange={(e) => updateNumber(e.target.value)}
                  />
                  <TextField 
                  id="postalcode" 
                  label="Postal Code"
                  fullWidth
                  onChange={(e) => updatePostalCode(e.target.value)}
                  />
                  <TextField 
                  id="city" 
                  label="City"
                  fullWidth
                  onChange={(e) => updateCity(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={8}>
                <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Restaurant name</TableCell>
                      <TableCell align="center">Street&nbsp;name</TableCell>
                      <TableCell align="center">Building&nbsp;number</TableCell>
                      <TableCell align="center">Post&nbsp;code</TableCell>
                      <TableCell align="center">City</TableCell>
                    </TableRow>
                  </TableHead>
                <TableBody>
                    <TableRow key={restname}>
                      <TableCell component="th" scope="row">
                        {restname}
                      </TableCell>
                      <TableCell align="center">{streetname}</TableCell>
                      <TableCell align="center">{number}</TableCell>
                      <TableCell align="center">{postalcode}</TableCell>
                      <TableCell align="center">{city}</TableCell>
                    </TableRow>
                </TableBody>
                  </Table>
                </TableContainer>
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="info"
              className={classes.submit}
            >
              Update details
            </Button>
            </CardFooter>
            </form>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
