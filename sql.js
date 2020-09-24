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

function addToDB(connection, sql, values){
    connection.query(sql, [values], function (error, result){
        if (error) throw error;
        console.log("Added a user " + result);
    });
}

function getResults(connection){
    connection.query("SELECT * FROM restaurants", function (error, result, fields) {
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
    // var restaurants = [
    //     ['Restaurant Joann','Nijverheidstraat 2, 7511 JM Enschede','+31537200820'],
    //     ['Lovely Local','Walstraat 7, 7511 GE Enschede','+31683800103'],
    //     ['Kosie Restaurant','Van Lochemstraat 226, 7511 PM Enschede','+31534789938'],
    //     ['Japans Restaurant TAO','Deurningerstraat 17, 7514 BC Enschede','+31534320106'],
    //     ['Restaurant Het Middelpunt','Rembrandtlaan 56, 7545 ZL Enschede','+31534317020'],
    //     ['Restaurant De Tropen','Bolwerkstraat 9, 7511 GP Enschede','+31534345350'],
    //     ['Restaurant de Basis','Walstraat 15-17, 7511 GE Enschede','+31537506657'],
    //     ['The Saloon','Walstraat 63, 7511 GG Enschede','+31534312274'],
    //     ['Carlinas Latin Cuisine','Walstraat 69, 7511 GG Enschede','+31537502525'],
    //     ['Argentijns restaurant poco mucho','Korte Haaksbergerstraat, 7511 JV Enschede','+31534332222'],
    //     ['Thais Restaurant Aroy-D','Noorderhagen 20, 7511 EL Enschede','+31532302090'],
    //     ['Het Paradijs','Nicolaas Beetsstraat 48, 7514 CW Enschede','+31534367919'],
    //     ['Mazza','Walstraat 1, 7511 GE Enschede','+31537504170'],
    //     ['Restaurant LaRoche','Hengelosestraat 200, 7521 AL Enschede','+31534353855']
    // ]

    var sqlInsert = "INSERT INTO restaurants (name,location,contact) VALUES ?";
    // addToDB(connection, sqlInsert, restaurants);    
    getResults(connection);
});
// restaurant table
// users and restaurant table