'user strict';
var sql = require('../../sql.js');


//  .post(checkins.create_checkin)
  // .get(checkins.get_checkin)
  // .put(checkins.update_checkin)
  // .delete(checkins.delete_checkin);


//Checkin object constructor (needs more fields, e.g. created_at)
var Checkin = function(checkin){
    this.userid = checkin.userid;
    this.restid = checkin.restid;
    this.at_risk = checkin.at_risk;
    this.time_stamp = Date();
};


//SQL Queries for checkin in
Checkin.createCheckin = function (newCheckin, result) {
        sql.query("INSERT INTO checkins set ?", newCheckin, function (err, res) {

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
