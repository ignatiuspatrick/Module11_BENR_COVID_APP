const express = require('express');
const path = require('path');
// const https = require('https');
// const fs = require('fs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


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
// var connection = mysql.createConnection(
//   config
// );
// connection.connect();

//ROUTES & BODYPARSER FOR MIDDLEWARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// // enable CORS without external module
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, ");
//     res.header('Access-Control-Allow-Credentials',true);
//     next();
//   });
var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:5000'];
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


//// TODO: Make secured routes use verify().
var routes = require('./app/routes/appRoutes');
routes(app);
