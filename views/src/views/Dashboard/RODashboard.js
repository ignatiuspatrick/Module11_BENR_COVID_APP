import React from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import GetAppIcon from '@material-ui/icons/GetApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import { jsPDF } from "jspdf";

import back from "../../hosts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const username = localStorage.getItem('name');
  const [qrvalue, setQRValue] = React.useState('123456'); // get from the backend later
  const [qrformat, setQRFormat] = React.useState('');
  const [novisitors, setNovisitors] = React.useState(0);
  const [isshownqr, setIsShownQR] = React.useState(false);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = today.toLocaleString('default', { month: 'long' });
  var yyyy = today.getFullYear();

  var QRCode = require('qrcode.react');

  // for the backend
  var tablehead = ["Date", "Check In", "Check Out"];
  // for stats
  var counter = new Date(yyyy, today.getMonth(), 0).getDate();
  const [ownerid,setId] = React.useState(0);
  const [restid, setRestId] = React.useState(0);
  const [tableData, setTable] = React.useState([]);
  // time of stay
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [tos, setTos] = React.useState(200); // format is xx:xx:xx, 200 is for 2 hours
  const [issettingtos, setIsSettingTOS] = React.useState(false);
  const [isdisabled, setIsDisabled] = React.useState(false); // save tos button controller

  // the function is used to set the maximum time of stay for a restaurant instance.
  // @ param: trid: (integer) restaurant id.
  function invokeTOS(trid) {
    // create request to get restaurant owner's id, parameters includes the uri and credentials for security.
    // parameters passed includes the uri, credentials (for security), and restaurant id inside the body (form).
    const requesttos = require('request');
    let optionsgettos = {
      uri: back + '/restaurants/gettos',
      withCredentials: true,
      form: {
        restid: trid
      }
    }
    requesttos.post(optionsgettos, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else if (res.statusCode === 200) {
        var obj = JSON.parse(body);
        setTos(obj.tos); // setting the returned value (time of stay) on the client (frontend) side
      }
    })
  }

  // invoked at the beginning of page rendering.
  React.useEffect(() => {
    async function getId(){
      var tempresid; 
      // create request to get restaurant owner's id, parameters includes the uri and credentials for security.
      // parameters passed includes the uri and credentials (for security).
      const request = require('request');
      let options = {
        uri: back + '/superusers/getid',
        withCredentials: true
      };
      // sending request to the backend to get restaurant owner's id.
      request.get(options,(err,res,body) => {
        if (err) {
          return console.log(err); // returns the error if the request failed.
        } else if(res.statusCode === 200) { // successful request.
          var obj = JSON.parse(body);
          setId(obj.id);
          var owid = obj.id; // setting the owner id on the client (frontend) side.
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
          // sending request to the backend to get restaurant unique's id
          request2.post(options2, (err,res,body) => {
            if (err) {
              return console.log(err);
            } else if (res.statusCode === 200) { // successful request
              var obj = JSON.parse(body);
              setRestId(obj[0].id); // setting the restaurant id on the client (frontend) side
              tempresid = obj[0].id;
              const request3 = require('request');
              // create request to get number of infection for statistics of restaurant dashboard, will be displayed on the table later on.
              // parameters passed includes the uri, credentials (for security), owner id and restaurant id in the body (form).
              let options3 = {
                uri: back + '/superusers/listinfections',
                withCredentials: true,
                form: {
                  ownerid:owid,
                  restid: obj[0].id
                }
              };
              // sending request to the backend to get list of infections.
              request3.post(options3,(err,res,body) => {
                if (err) {
                  return console.log(err);
                } else if (res.statusCode === 200) { // rendering results of infection to the table.
                  var obj = JSON.parse(body);
                  var tabledata = [];
                  for (var i = 0; i < obj.result.length; i++) {
                    var checkin = obj.result[i].checkin_time.split("T");
                    var checkout = obj.result[i].checkout_time.split("T");
                    if (checkin[0] === checkout[0]) {
                      var item = [];
                      item.push(checkin[0],checkin[1].substring(0,8),checkout[1].substring(0,8));
                      tabledata.push(item);
                    }
                  }
                  setTable(tabledata); // setting the result (list of infections) of the client side.
                  invokeTOS(tempresid);
                }
              });
            }
          });
        }
      });
    }
    getId();
  },[]);


  // the function is used to get total number of visitors
  // @ param: type = (integer) range of day to count the number of visitors in a restaurant, e.g. 0 for today, 1 for today and yesterday, etc.
  function getNOVisitors(type) {
    const request3 = require('request');
    let options3 = {
      uri: back + '/superusers/visited',
      withCredentials: true,
      form: {
        ownerid: ownerid,
        restid: restid,
        days: type
      }
    }
    request3.post(options3, (err,res,body) => {
      if (err) {
        return console.log(err);
      } else if (res.statusCode === 200) {
        var obj = JSON.parse(body);
        setNovisitors(obj.result);
      }
    })
  }

  // setting the qr code format 
  // @ param: qrf = (string) qr code format to be downloaded ("PDF" or "PNG")
  function handleQRFormatChange(qrf) {
    setQRFormat(qrf);
  }

  // the function to set maximum hours from time of, where 0 is the min value and 24 is the max value.
  function handleHoursChange(e) {
    var obj = parseInt(e);
    if (0 <= obj && obj <= 24) {
      setHours(obj);
    } else {
      if (isNaN(e)) {
        setHours(0);
      }
    }
  }

  // the function to set maximum minutes from time of stay, where 0 is the min value and 59 is the max value.
  function handleMinutesChange(e) {
    var obj = parseInt(e);
    if (0 <= obj && obj <= 59) {
      setMinutes(obj);
    } else {
      if (isNaN(e)) {
        setMinutes(0);
      }
    }
  }
  
  // the function sets the tos change to the backend and updates the value to the client (frontend) side.
  function handleTOSChange() {
    var tosval = String(hours); // backend recognizes the format hh:mm.
    if (String(hours).length === 1)  {
      tosval = '0'+ tosval + ':';
    } else {
      tosval = tosval + ':';
    }
    if (String(minutes).length === 1)  {
      tosval = tosval + '0' + String(minutes);
    } else {
      tosval = tosval + String(minutes);
    }
    const requestsettos = require('request');
    let optionssettos = {
      uri: back + '/restaurants/settos',
      withCredentials: true,
      form: {
        restid: restid,
        tos: tosval
      }
    }
    requestsettos.post(optionssettos, (err, res, body) => {
      if (err) {
        return console.log(err);
      } else if (res.statusCode === 200) {
        invokeTOS(restid); // get the value from the backend and updates it in the frontend.
        setIsSettingTOS(false); // hide setting tos display.
      }
    })
  };
  
  // getting the unique qr code numerical value from the backend.
  function generateQRCode() {
    // create request to get qr numerical value to be generated by npm qr module.
    // parameters passed includes the uri appended by restaurant id and credentials (for security), 
    const requestqr = require('request');
    let optionsqr = {
      uri: back + '/restaurants/getqr/' + restid,
      withCredentials: true,
    };
    requestqr.get(optionsqr, (err,res,body) => {
      if (err) {
        return console.log(err);
      } else if (res.statusCode === 200) {
        var obj = JSON.parse(body);
        setQRValue(obj.code); // set the numerical value of qr code.
      }
    })
    setIsShownQR(true); // show the qr code.
  }

  // the function to hide qr code.
  function hideQRCode() {
    setIsShownQR(false);
  }

  // the function to perform download the qr code.
  function downloadQRCode() {
    const canvas = document.getElementById("qrimg");
    var url;
    if (qrformat === "PNG"){
      url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = url;
      downloadLink.download = "qrcode." + qrformat.toLowerCase();
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } else if (qrformat === "PDF") {
      var imgData = canvas.toDataURL("image/jpeg", 1.0);
      var pdf = new jsPDF();
      pdf.addImage(imgData, 'JPEG', 0, 0);
      pdf.save("qrcode.pdf");
      return null;
    }
  }
  
  // rendered html
  return (
    <div>
      <h3>Welcome, {username}!</h3>
      <GridContainer>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <GetAppIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Download QR Code</p>
              <Grid container>
                <Grid item xs={12}>
                  <ButtonGroup color="inherit" aria-label="outlined primary button group" size="small" className={classes.downloadQRButtonGroup}>
                    <Button onClick={(e) => handleQRFormatChange("PDF")}>PDF</Button>
                    <Button onClick={(e) => handleQRFormatChange("PNG")}>PNG</Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                {isshownqr ? 
                <Button className={classes.downloadQRButton} variant="contained" onClick={hideQRCode}>
                  Minimize QR Code
                </Button>
                :
                <Button className={classes.downloadQRButton} variant="contained" onClick={generateQRCode}>
                  Generate QR Code
                </Button>
                }
                </Grid>
              </Grid>
            </CardHeader>
            <CardFooter stats>
              <Grid container>
                <Grid item xs={12}>
                  {isshownqr ? 
                  <QRCode
                  id="qrimg"
                  value={qrvalue}
                  size={290}
                  level={"H"}
                  includeMargin={true}
                  />
                  : 
                  null}
                </Grid>
                <Grid item xs={12}>
                  {qrformat !== '' && isshownqr ? 
                  <Button className={classes.downloadQRButton} variant="contained" onClick={downloadQRCode}>
                    Download as {qrformat}
                  </Button>
                  :
                  null
                  }
                </Grid>
              </Grid>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Number of Visitors</p>
              <h3 className={classes.cardTitle}>{novisitors}</h3>
              <p className={classes.cardCategoryGrey}>
                {dd}th of {mm}, {yyyy}
              </p>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                <ButtonGroup color="inherit" aria-label="outlined primary button group" size="small" style={{marginLeft: 10}}>
                  <Button onClick={() => getNOVisitors(0)}>Today</Button>
                  <Button onClick={() => getNOVisitors(6)}>Week</Button>
                  <Button onClick={() => getNOVisitors(counter - 1)}>Month</Button> 
                </ButtonGroup>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <AccessTimeIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Time of Stay</p>
              <h3 className={classes.cardTitle}>{tos}</h3>
            </CardHeader>
            <CardBody>
              {issettingtos ? 
              <GridContainer>
                <GridItem xs={6}>
                  <TextField
                  id="outlined-password-input"
                  label="Hours"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { max: 24, min: 0 } }}
                  fullWidth
                  style= {{paddingRight: "0px"}}
                  value={hours}
                  onChange={(e) => handleHoursChange(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={6}>
                  <TextField
                  id="outlined-password-input"
                  label="Minutes"
                  variant="outlined"
                  type="number"
                  InputProps={{ inputProps: { max: 59, min: 0 } }}
                  fullWidth
                  style= {{paddingLeft: "0px"}}
                  value={minutes}
                  onChange={(e) => handleMinutesChange(e.target.value)}
                  />
                </GridItem>
                <GridItem xs={12}>
                  <Button className={classes.downloadQRButton} style={{marginRight: "5px"}} variant="contained" onClick={() => setIsSettingTOS(false)}>
                    Cancel
                  </Button>
                  <Button className={classes.downloadQRButton} variant="contained" onClick={handleTOSChange} disabled={isdisabled}>
                    Save
                  </Button>
                </GridItem>
              </GridContainer>
              :
              <Button className={classes.downloadQRButton} variant="contained" onClick={() => setIsSettingTOS(true)}>
                Edit
              </Button>
              }
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="info">
              <CardIcon color="info">
                <RestaurantIcon />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Recent Infected Visits</h4>
              <p className={classes.cardCategoryWhite}>
                History
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="info"
                tableHead={tablehead}
                tableData={tableData}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
