'user strict';
var sql = require('../../db.js');
var mysql = require('mysql');
const cryptoRandomString = require('crypto-random-string');

//Restaurant object constructor
var Restaurant = function(restaurant){
    this.name = restaurant.name;
    this.streetname = restaurant.streetname;
    this.number = restaurant.number;
    this.postalcode = restaurant.postalcode;
    this.city = restaurant.city;
    this.ownerid = restaurant.ownerid;
};

//Restaurant SQL queries

//create a new restaurant.
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

//selects the first restaurant linked to a restaurant owner.
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



/*
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
*/

//Returns the time of stay of a restaurant.
Restaurant.gettimeofstay = function (restid, result) {
        sql.query("SELECT ToS as t FROM restaurants WHERE id = ?", restid, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                  console.log(res)
                 result(null, res[0].t);
                }
            });
};

//Sets the time of stay of a restaurant.
Restaurant.settimeofstay = function (restid, tos, result) {
        sql.query("UPDATE restaurants SET ToS = ? WHERE id = ?", [tos, restid], function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                 result(null, {message:"Success"});
                }
            });
};


/*
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
*/

//Updates a restaurant with new information.
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

/*
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
*/

//Generates a unique QR code for a restaurant.
//Will generate a 16 letter cryptographically secure linkes to a restaurant to facilitate checking in with
Restaurant.generateQR = function(restaurantId, result){
  var code = cryptoRandomString({length: 16});
  sql.query("DELETE FROM restaurant_codes WHERE restid = ?", restaurantId, function(err, res){
    if(err){
      return result(err, null);
    }
  });
  sql.query("INSERT INTO restaurant_codes SET restid = ?, code = ?", [restaurantId, code], function(err, queryresult){
    if(err) {
        console.log("error: ", err);
        result(err, null);
    } else {
     result(null, code);
    }
  });
}

//get QRcode if exists, otherwise make a new one.
Restaurant.getQR = function(restaurantId, result){
  sql.query("SELECT code FROM restaurant_codes WHERE restid = ?", restaurantId, function(err, queryresult){
    if(err){
      return (err, null);
    } else {
      if (queryresult.length == 0){ // no code available, make new one
        var code = cryptoRandomString({length: 16});
        sql.query("INSERT INTO restaurant_codes SET restid = ?, code = ?", [restaurantId, code], function(err, queryresult){
          if(err) {
              console.log("error: ", err);
              return result(err, null);
          } else {
           return result(null, code);
          }
        });

      } else {
        return result(null, queryresult[0].code);
      }
    }
  });
}
module.exports= Restaurant;
