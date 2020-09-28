const express = require('express');
const path = require('path');
// const https = require('https');
// const fs = require('fs');

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

//RUN SERVER
const PORT = process.env.PORT || 5000;
//Change app to server when using HTTPS
app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));




var routes = require('./app/routes/appRoutes');
routes(app);
