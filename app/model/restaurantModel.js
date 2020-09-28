'user strict';
var sql = require('../../db.js');

//Restaurant object constructor, probably needs more fields (name etc)
var Restaurant = function(restaurant){
    this.name = restaurant.name;
    this.location = restaurant.location;
    this.contact = restaurant.contact;

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
        sql.query("", restaurantId, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
                }
            });
};

Restaurant.getAllRestaurants = function (result) {
        sql.query("Select * from my_table", function (err, res) {

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
Restaurant.updateRestaurant = function(restaurantId){
//// TODO: fill in
};
Restaurant.deleteRestaurant = function(restaurantId, result){
     sql.query("DELETE FROM restaurants WHERE id = ?", [id], function (err, res) {

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
