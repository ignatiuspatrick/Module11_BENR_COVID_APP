'user strict';
var sql = require('../../db.js');
var mysql = require('mysql');
const cryptoRandomString = require('crypto-random-string');

//Restaurant object constructor, probably needs more fields (name etc)
var Restaurant = function(restaurant){
    this.name = restaurant.name;
    this.streetname = restaurant.streetname;
    this.number = restaurant.number;
    this.postalcode = restaurant.postalcode;
    this.city = restaurant.city;
    this.ownerid = restaurant.ownerid;
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

Restaurant.getRestaurant = function (ownerid, result) {
        sql.query("SELECT id,name,streetname,number,postalcode,city FROM restaurants WHERE ownerid = ?",ownerid, (err, res) => {
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
                    result(err, null);
                }
                else{
                  console.log('restaurants : ', res);
                 result(null, res);
                }
            });
};


Restaurant.getNotSelected = function (result) {
    sql.query("SELECT name FROM restaurants WHERE ownerid = 0", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
            //   console.log('restaurants : ', res);
             result(null, res);
            }
        });
};

Restaurant.updateRestaurant = function(restaurantId, newRestaurant, result){
    let update = "UPDATE restaurants SET name = ?,streetname = ?,number = ?,postalcode = ?, city = ?, ownerid = ? WHERE id = ?";
    let query = mysql.format(update,[newRestaurant.name,newRestaurant.streetname,newRestaurant.number,newRestaurant.postalcode,newRestaurant.city,newRestaurant.ownerid,restaurantId]);
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
                    result(err, null);
                }
                else{
                 result(null, res);
                }
            });
};

//Will generate a 16 letter cryptographically secure linkes to a restaurant to facilitate checking in with
//unique QR codes.
Restaurant.generateQR = function(restaurantId, result){
  var code = cryptoRandomString({length: 16});
  sql.query("INSERT INTO restaurant_codes SET restid = ?, code = ?", [restaurantId, code], function(err, res){
    if(err) {
        console.log("error: ", err);
        result(err, null);
    } else {
     result(null, code);
    }
  });
}

module.exports= Restaurant;
