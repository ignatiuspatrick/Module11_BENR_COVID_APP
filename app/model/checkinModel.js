'user strict';
var sql = require('../../db.js');


//  .post(checkins.create_checkin)
  // .get(checkins.get_checkin)
  // .put(checkins.update_checkin)
  // .delete(checkins.delete_checkin);


//Checkin object constructor (needs more fields, e.g. created_at)
var Checkin = function(checkin){
    this.userid = parseInt(checkin.userid, 10);
    this.restid = parseInt(checkin.restid, 10);
    this.at_risk = parseInt(checkin.at_risk, 10);
    // this.created_at = Date();
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

module.exports = Checkin;
