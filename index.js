const express = require('express');
const path = require('path');
// const https = require('https');
// const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const schedule = require('node-schedule'); //for cleaning the database.
const tasks = require('./app/tasks/tasks');


//https
//Certs generated using:
//openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt

// var key = fs.readFileSync('certs/selfsigned.key');
// var cert = fs.readFileSync('certs/selfsigned.crt');
// var options = {
//   key: key,
//   cert: cert
// };
// var server = https.createServer(options, app);


//MYSQL
const mysql = require('mysql');
const config = require('./db.js');


//ROUTES & BODYPARSER FOR MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// let back = 'http://localhost:5000';
let back = 'http://195.201.98.111:5000'
var allowedOrigins = ['http://localhost:3000',
                      back];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  exposedHeaders: ['Origin','Accept', 'Content-Type', 'x-access-token'],
  credentials: true,
}));


//RUN SERVER
const PORT = process.env.PORT || 5000;
//Change app to server when using HTTPS
app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));

//These tasks will be run every time it is 04:30am.
var runTask = schedule.scheduleJob('0 30 4 * *', function(){
  tasks.removeCheckins();
  tasks.removeAtRisk();
  tasks.removeInfected();
  console.log("excecuted scheduled tasks.");
});

var routes = require('./app/routes/appRoutes');
routes(app);
