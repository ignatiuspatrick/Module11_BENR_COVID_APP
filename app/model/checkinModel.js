'user strict';
var sql = require('../../db.js');

//Checkin object constructor (needs more fields later on.
var Checkin = function(checkin){
    this.userid = parseInt(checkin.userid, 10);
    this.restid = parseInt(checkin.restid, 10);
    this.at_risk = parseInt(checkin.at_risk, 10);
};


//SQL Queries for checkin in
Checkin.createCheckin = function (newCheckin, result) {
        sql.query("INSERT INTO checkin set ?", newCheckin, function (err, res) {

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
