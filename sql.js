const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection(config);

function createDB(connection){
    connection.query("CREATE DATABASE appDB", function(error, result){
        if (error) {
            console.log('Database already exists!');
        }else{
            console.log("Database was created!");
        }
    });
}

function createTable(connection,sql){
    connection.query(sql, function (error, result) {
        if (error) {
            console.log('Table already exists!');
        } else{
            console.log("Table created!");
        }
    });
}

function addUser(connection, sql){
    connection.query(sql, function (error, result){
        if (error) throw error;
        console.log("Added a user " + result);
    });
}

function getResults(connection){
    connection.query("SELECT * FROM users", function (error, result, fields) {
        if (error) throw error;
        console.log(result);
      });
}

connection.connect(function(error){
    if(error) throw error;
    console.log('Connected to DB!');
    createDB(connection);
    var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, token varchar(255))";
    createTable(connection, sql);
    var sqlInsert = "INSERT INTO users (token) VALUES ('1234567890abcdef')";
    addUser(connection, sqlInsert);    
    getResults(connection);
});
