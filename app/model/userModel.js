'user strict';
var sql = require('../../db.js');
const cryptoRandomString = require('crypto-random-string');

//User object constructor, needs more fields
var User = function(user){
  this.id = user.id;
  this.type = user.type;
};

User.createUser = function (newUser, result) {
        sql.query("INSERT INTO users set ?", newUser, function (err, res) {
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                } else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });
};

User.getUser = function (userId, result) {
    sql.query("SELECT id,token,type FROM users WHERE id = ?", userId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                if(res.length > 0){
                    result(null, res);
                }else{
                    result(null,"User does not exist");
                }
            }
        });
};
User.updateUser = function (userId, user, result) {
    sql.query("UPDATE users SET token = ? WHERE id = ?", [user.token,userId], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null,res);
            }
        });
};
User.deleteUser = function (userId, result) {
    sql.query("DELETE FROM users WHERE id = ?", userId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
};

User.generateCode = function(userId, result){

  //First check if a code is available (that is still valid, e.g. less than a day old).
  sql.query("SELECT code FROM ggd_codes WHERE userid = ? AND `created_at` > timestampadd(hour, -24, now());", userId, function(err,queryresult){
    console.log(queryresult);
    if(err){ //error handling
      return result(err, null);
    }else if(queryresult.length == 1){ //we have a valid result!
      return result(null, queryresult[0].code);
    } else if (queryresult.length == 0){ //We don't have a valid result yet so we generate one.

      //Did not return yet => now we have to generate a code ourselves.
      let temp_code = cryptoRandomString({length: 8, type: 'distinguishable'});
      console.log(temp_code);
      sql.query("INSERT INTO ggd_codes SET userid = ?, code = ?", [userId, temp_code], function(err,queryresult){
        if (err) {
           //duplicate entry, very rare error but might wanna clarify if it happens, can just try again in this case.
          if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
              return result("Please try again, there was a duplicate code in the database. (mysqlcode 1062)",null);
          }else{ //different errors
            return result(err, null);
          }
        } else { //eyy no errors, succesfully made a new code. Return it to user.
          return result(null, temp_code);
        }
      });

    } else { //Ya idk too many queryresult entries. So I guess we gotta give an error.
      return result("Something went wrong, too many codes available.", null);
    }
  });

}

User.markUser = function(code, result){
  //   -Mark as infected in db (new column, default 0) (update query)
  sql.query('UPDATE users SET infected = 1 WHERE id in (SELECT userid FROM ggd_codes WHERE code = ? AND `created_at` > timestampadd(hour, -24, now()))',
   code, function(err, queryresult){
    if(err){
      return result(err, null);
    } else {
      console.log(queryresult);
      console.log('The following usercode is succesfully infected: ' + code);
    }
  });

//QUERY:
// SELECT DISTINCT c2.userid FROM `checkin` c1, `checkin` c2 WHERE c1.userid = 20 AND c1.restid = c2.restid AND
// ((c2.checkin_time > c1.checkin_time AND c2.checkin_time < c1.checkout_time)
// OR (c1.checkin_time > c2.checkin_time AND c1.checkin_time < c2.checkout_time))
// UPDATE `users`
// SET at_risk = 1, at_risk_since = ?
// WHERE id IN (
//   SELECT DISTINCT c2.userid
//   FROM `checkin` c1, `checkin` c2
//   WHERE c1.userid = 33 AND c1.restid = c2.restid
//     AND ((c2.checkin_time > c1.checkin_time AND c2.checkin_time < c1.checkout_time)
//       OR (c1.checkin_time > c2.checkin_time AND c1.checkin_time < c2.checkout_time)));

  let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  console.log(timestamp);
  const query = `UPDATE users
    SET at_risk = 1, at_risk_since = ?
    WHERE id IN (
      SELECT DISTINCT c2.userid
      FROM checkin c1, checkin c2
      WHERE c1.userid = (SELECT userid FROM ggd_codes WHERE code = ? AND created_at > timestampadd(hour, -24, now())) AND c1.restid = c2.restid
        AND ((c2.checkin_time > c1.checkin_time AND c2.checkin_time < c1.checkout_time)
          OR (c1.checkin_time > c2.checkin_time AND c1.checkin_time < c2.checkout_time)))`;
  sql.query(query, [timestamp, code], function(err, queryresult){
    if(err){
      return result(err, null);
    } else {
      console.log('Succesfully market people as `at risk`.');
      return result(err, queryresult.affectedRows); //send back how many people are at risk
    }
  });

}

module.exports= User;
