const mysql = require('mysql');
const express = require("express");
const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'appDb'
});

function addUser(data){
    let inserttoDB = 'INSERT INTO users (userid) VALUES ?';
    let query = mysql.format(inserttoDB,[data]);
    pool.query(query, (error, result) =>{
        if (error) {
            console.log(error);
            return;
        };
        console.log("Added a user with a user id: " + data);
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
// app.get("/",(req,res) => {
//     pool.getConnection((err,connection) => {
//         if(err) throw err;
//         let data = [["123123123"],["333444555"]];
//         // addUser(data);
//         setTimeout(() => {
//             getResults("users");
//         },500);



//     });

//     // getResults("restaurants")
//     // getResults("checkin")
// });

// app.listen(3000, () => {
//     console.log('Server is running at port 3000');
// });
