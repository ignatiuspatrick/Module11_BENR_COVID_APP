const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

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

app.listen(PORT, () => console.log(`Server started on port  ${PORT}`));




var routes = require('./app/routes/appRoutes');
routes(app);
