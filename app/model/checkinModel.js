'user strict';
var sql = require('../../db.js');

//Checkin object constructor (needs more fields later on.
var Checkin = function(checkin){
    this.userid = parseInt(checkin.userid, 10);
    this.restid = parseInt(checkin.restid, 10);
    this.at_risk = parseInt(checkin.at_risk, 10);
};


//Creates a new checkin for the restaurant linked to the QR code
//Refuse if customer attempting to check in is infected.
Checkin.createCheckin = function (userId, code, result) {
  //Select restaurant id from restaurant_codes using code
  sql.query("SELECT restid FROM restaurant_codes WHERE code = ?", [code], function (err, id) {
    if(err) {
      console.log(err);
      return result(err, null);
    } else if (id.length < 1) {
      console.log(err);
      return result(1, "No associated restaurant id");
    }else{
      //Select time of stay of selected restaurant
      sql.query("SELECT ToS FROM restaurants WHERE id = ?", [id[0].restid], function (err, tos) {
        if(err) {
          console.log(err);
          return result(err, null);
        } else if(!tos) {
          return result("No ToS found.", null);
        } else {

          //check if custoemer is infected before checking someone in
          sql.query("SELECT infected FROM users WHERE id = ?", userId, function(err, infected){
            console.log(infected);
            if(infected[0].infected){ //also for at risk?
              return result(null, -1); //infected, should not get access
            }


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
                  console.log(res.insertId); //we return the checkinId
                  result(null, res.insertId);
              }
          });
        }); 
      }
      });
    }
  });
}

//Checking out through checkinId
/*
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
*/

module.exports = Checkin;
