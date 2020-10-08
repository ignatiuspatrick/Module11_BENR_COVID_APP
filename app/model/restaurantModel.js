'user strict';
var sql = require('../../db.js');
var mysql = require('mysql');

//Restaurant object constructor, probably needs more fields (name etc)
var Restaurant = function(restaurant){
    this.name = restaurant.name;
    this.location = restaurant.location;
    this.contact = restaurant.contact;
    this.ownerid = restaurant.id;
};

//Restaurant SQL queries
//// TODO: THESE QUERIES ARE NOT UP-TO-DATE YET. MAKE SURE THEY ALIGN WITH THE DATABASE.

Restaurant.createRestaurant = function (newRestaurant, result) {
        sql.query("INSERT INTO restaurants set ?", newRestaurant, function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

Restaurant.getRestaurant = function (restaurantId, result) {
        sql.query("SELECT name,location,contact FROM restaurants WHERE id = ?",restaurantId, (err, res) => {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    if(res.length > 0){
                        result(null, res);
                    }else{
                        result(null,"restaurant does not exist");
                    }
                }
            });
};

Restaurant.getAllRestaurants = function (result) {
        sql.query("SELECT * FROM restaurants", function (err, res) {
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
    let update = "UPDATE restaurants SET name = ?,location = ?,contact = ?,ownerid = ? WHERE id = ?";
    let query = mysql.format(update,[newRestaurant.name,newRestaurant.location,newRestaurant.contact,newRestaurant.ownerid,restaurantId]);
    sql.query(query, (err,res)=>{
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }else{
            result(null,res);
        }
    })
};
Restaurant.deleteRestaurant = function(restaurantId, result){
     sql.query("DELETE FROM restaurants WHERE id = ?", [restaurantId], function (err, res) {
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
