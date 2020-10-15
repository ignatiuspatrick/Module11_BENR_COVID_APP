'user strict';

var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'mindhash',
    database : 'appdb',
});

pool.getConnection((err,connection) => {
    if (err) throw err;
});

module.exports = pool;
