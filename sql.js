const mysql = require('mysql');
// const config = require('./config');
const express = require("express");
const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appDb'
});



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

function addUser(data){
    let inserttoDB = 'INSERT INTO users (token) VALUES ?'; // user, id,token
    let query = mysql.format(inserttoDB,[data]);
    pool.query(query, (error, result) =>{
        if (error) {
            console.log(error);
            return;
        };
        console.log("Added a user with a token" + data);
    });
}

function getResults(table){
    let get = 'SELECT * FROM ??';
    let query = mysql.format(get,[table]);
    pool.query(query, (error, result) => {
        if (error) throw error;
        console.log(result);
      });
}
app.get("/",(req,res) => {
    pool.getConnection((err,connection) => {
        if(err) throw err;
        let data = [["someverylongrandomtoken"],["randomrandomrandom"]];
        addUser(data);
        setTimeout(() => {
            getResults("users");
        },500);

    });
    // createDB(connection);
    // var sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, token varchar(255))";
    // createTable(connection, sql);

    // var sqlInsert = "INSERT INTO restaurants (name,location,contact) VALUES ?";
    // addToDB(connection, sqlInsert, restaurants);    
    
});

app.listen(3000, () => {
    console.log('Server is running at port 3000');
});


// restaurant table
// users and restaurant table