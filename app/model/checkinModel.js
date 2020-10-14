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
  //Select restaurant id from restaurrant_codes using code
  sql.query("SELECT restid FROM restaurant_codes WHERE code = ?", [code], function (err, id) {
    if(err) {
      console.log(err);
      return result(err, null);
    } else if (id.length < 1) {
      console.log(err);
      return result(err, "No associated restaurant id")
    }
    else{
      //Select restaurant id from restaurrant_codes using code
      sql.query("SELECT ToS FROM restaurants WHERE id = ?", [id[0].restid], function (err, tos) {
        if(err) {
          console.log(err);
          return result(err, null);
        }
        else{
          //Create user checkin
        var cot = new Date()
        var addedtime = tos[0].ToS.split(":")
        cot.setSeconds(cot.getSeconds() + parseInt(addedtime[2]));
        cot.setMinutes(cot.getMinutes() + parseInt(addedtime[1]));
        cot.setHours(cot.getHours() + parseInt(addedtime[0]));
        sql.query("INSERT INTO checkin SET userid = ?, restid = ?, checkin_time = ?, checkout_time = ?, at_risk = 0", [userId, id[0].restid, new Date(), cot], function (err, res) {
          if(err) {
              console.log(err);
              return result(err, null);
          }
          else{
            //Delete restaurant code
            sql.query("DELETE FROM restaurant_codes WHERE code = ?", code, function(err,res) {
              if(err){
                console.log("error: " + err);
                return result(err, null);
              }
            });
              console.log(res.insertId); //we return the checkinId
              result(null, res.insertId);
          }
        });
      }
      });
    }
  });
}

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
