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
  // const [code, setCode] = React.useState('');
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
  const [tos, setTos] = React.useState(2); //hours or mins?

  //might be useful for later
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
          var owid = obj.id;
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
            const request3 = require('request');
            let options3 = {
              uri: back + '/superusers/listinfections',
              withCredentials: true,
              form:{
                ownerid:owid,
                restid: obj[0].id
              }
            };
            request3.post(options3,(err,res,body)=>{
              if (err) {
                return console.log(err);
              }
              if(res.statusCode === 200){
                var obj = JSON.parse(body);
                var tabledata = [];
                for(var i=0; i<obj.result.length; i++){
                  var checkin = obj.result[i].checkin_time.split("T");
                  var checkout = obj.result[i].checkout_time.split("T");
                  if(checkin[0]===checkout[0]){
                    var item = [];
                    item.push(checkin[0],checkin[1].substring(0,8),checkout[1].substring(0,8));
                    tabledata.push(item);
                  }else{
                    console.log("different days of checkin!");
                  }
                }
                setTable(tabledata);
              }
            });
          }
        });

        }
      });
    }
    getId();
  },[]);

  function getNOVisitors(type) {
    console.log(type)
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

  function handleQRFormatChange(qrf) {
    setQRFormat(qrf);
  }
  
  const handleTOSChange = (event) => {
    setTos(event.target.value);
    // post and get request
  };
  
  // for the backend
  function generateQRCode() {
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
        setQRValue(obj.code);
      }
    })
    setIsShownQR(true);
  }

  function hideQRCode() {
    setIsShownQR(false);
  }

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
                    Download {qrformat}
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
                  <Button onClick={()=> getNOVisitors(0)}>Today</Button>
                  <Button onClick={()=> getNOVisitors(6)}>Week</Button>
                  <Button onClick={()=> getNOVisitors(counter - 1)}>Month</Button> 
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
            </CardHeader>
            <CardBody>
              <TextField
                id="outlined-password-input"
                label="Set Time of Stay"
                variant="outlined"
                value={tos}
                onChange={handleTOSChange}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={7}>
          <Card>
            <CardHeader color="info">
              <CardIcon color="info">
                <RestaurantIcon />
              </CardIcon>
              <h4 className={classes.cardTitleWhite}>Recent COVID-19 Cases Log</h4>
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
