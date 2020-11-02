'user strict';

var mysql = require('mysql');

//local mysql db connection
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'mindhash',
    database : 'appdb',
});

pool.on('connection',connection => {
    connection.query("SET time_zone='+01:00';", err=>{
        if (err) throw err;
    });
});

module.exports = pool;
