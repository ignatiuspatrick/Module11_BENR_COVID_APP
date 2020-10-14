'user strict';
var sql = require('../../db.js');

//Checkin object constructor (needs more fields later on.
var Checkin = function(checkin){
    this.userid = parseInt(checkin.userid, 10);
    this.restid = parseInt(checkin.restid, 10);
    this.at_risk = parseInt(checkin.at_risk, 10);
};


//SQL Queries for checkin in
//Restaurant is gathered from the unique
Checkin.createCheckin = function (userId, code, result) {
  console.log("id: " + userId);
        sql.query("INSERT INTO checkin SET userid = ?, restid = (SELECT restid FROM restaurant_codes WHERE code = ?), at_risk = 0", [userId, code], function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    return result(err, null);
                } else{
                  sql.query("DELETE FROM restaurant_codes WHERE code = ?", code, function(err,res){
                    if(err){
                      console.log("error: " + err);
                      return result(err, null);
                    }
                  });
                    console.log(res.insertId); //we return the checkinId
                    return result(null, res.insertId);
                }
            });
};

//Checking out through checkinId
Checkin.checkout = function (checkinId, result){
  console.log("brrrrrr post");
  var time = new Date().toISOString().slice(0, 19).replace('T', ' ');
  sql.query("UPDATE checkin SET checkout_time = ? WHERE id = ?", [time, checkinId], function(err, res){

    if(err){
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
}

module.exports = Checkin;
