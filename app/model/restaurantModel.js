'user strict';
var pool = require('../../db.js'); // use pool to handle concurrent requests.
const mysql = require('mysql');
//Restaurant object constructor, probably needs more fields (name etc)
var Restaurant = function(restaurant){
    this.name = restaurant.name;
    this.location = restaurant.location;
    this.contact = restaurant.contact;
};

//Restaurant SQL queries
//// TODO: THESE QUERIES ARE NOT UP-TO-DATE YET. MAKE SURE THEY ALIGN WITH THE DATABASE.

Restaurant.createRestaurant = function (newRestaurant, result) {
    console.log("new restaurant inserted! " + [newRestaurant]);
    // currently inserts a restaurant with a unique name
    let insert = 'INSERT INTO restaurants (name,location,contact) SELECT * FROM (SELECT ?,?,?) AS tmp WHERE NOT EXISTS (SELECT name FROM restaurants WHERE name = ?) LIMIT 1;'
    let query = mysql.format(insert,[newRestaurant.name,newRestaurant.location,newRestaurant.contact,newRestaurant.name]);   
    pool.query(query, (err, res) => {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            if(res.insertId!=0){
                result(null, res.insertId);
            }else{
                result(null,"restaurant already exists");
            }
        }
    });
};
Restaurant.getRestaurant = function (restaurantId, result) {
    let select = 'SELECT name,location,contact FROM restaurants WHERE id = ?';
    let query = mysql.format(select,[restaurantId]);   
        pool.query(query, (err, res) => {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    if(res.length > 0){
                        result(null, res);
                    }else{
                        result(null,"User does not exist");
                    }
                }
            });
};
Restaurant.getAllRestaurants = function (result) {
        pool.query("SELECT * FROM restaurants", function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('restaurants : ', res);
                 result(null, res);
                }
            });
};
Restaurant.updateRestaurant = function(restaurantId, newRestaurant, result){
    let update = "UPDATE restaurants SET name = ?,location = ?,contact = ? WHERE id = ?";
    let query = mysql.format(update,[newRestaurant.name,newRestaurant.location,newRestaurant.contact,restaurantId]);
    pool.query(query, (err,res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null,res);
        }
    })
};
Restaurant.deleteRestaurant = function(restaurantId, result){
     pool.query("DELETE FROM restaurants WHERE id = ?", [id], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                 result(null, res);
                }
            });
};

module.exports= Restaurant;
