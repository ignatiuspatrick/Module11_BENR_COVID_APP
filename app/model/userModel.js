'user strict';
var sql = require('../../db.js');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const saltRounds = 12;



//User object constructor. This is sufficient for Customers.
var User = function(user){
  this.id = user.id;
  this.type = user.type;
};

//We barely store anything from customers; just id and type
User.createCustomer = function (newUser, result) {
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

//for Restaurant personnel we store id, type, email and their hashed+salted pwd.
User.createPersonnel = function (userId, type, email, password, result){
  bcrypt.hash(password, saltRounds).then(function(hash){
    sql.query("INSERT INTO users SET id = ?, type = ?, email = ?, password = ?", [userId, type, email, hash], function(err, res){
      if(err){
        return result(err, null);
      } else {
        return result(null, userId)
      }
    });
  });
};

//Sign in personnel through unique email and a password.
User.signInPersonnel = function(email, password, result){
  sql.query('SELECT password FROM users WHERE email = ?',email, function(err, queryresult, fields) {
      if(err){
        console.log("error: ", err);
        result(err, false);
      } else {
        if(queryresult.length>0){ //To make sure we got query results
          console.log(queryresult);
          let hash = queryresult[0].password;
          bcrypt.compare(password, hash).then(function(success) { //Async compare for higher speed
            if(success) {
              result(null, true); //yay login
            }else{
              result(null, false); //nay login
            }
          }).catch((error) => {
            result(error,'Promise error');
          });
        }else{ //No query results
          console.log("Not registered or wrong email?");
          result(null, false);
        }
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

/* FOR CHARACTER_SET_RESULTS
--Case 1 where 1 checkins in before 2 and checks out before 2 (user 31 and 32)
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1010, 4, 31, '2020-02-29 19:00:07', '2020-02-29 20:00:59', false);
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1011, 4, 32, '2020-02-29 20:00:00', '2020-02-29 21:00:00', false);
--Case 2 where 2 checks in after 1 and checks out before 1 (user id 33 and 34) and the revere also works
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1012, 4, 33, '2020-02-29 00:05:07', '2020-02-29 00:50:00', false);
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1013, 4, 34, '2020-02-29 00:10:07', '2020-02-29 01:00:00', false);
--Case 3 where 1 checks in after 2 checks in and 1 checks out after 2 checks out
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1014, 4, 35, '2020-02-29 07:10:07', '2020-02-29 10:00:00', false);
insert into checkin (id, restid, userid, checkin_time, checkout_time, at_risk) values (1015, 4, 36, '2020-02-29 08:05:07', '2020-02-29 09:30:00', false);
*/

  let timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
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
      console.log('Succesfully marked user/customer as `at risk`.');
      return result(err, queryresult.affectedRows); //send back how many people are at risk
    }
  });

}

User.getLink = function(userId, result){

  sql.query("SELECT code FROM personnel_codes WHERE userid = ?", userId, function(err, queryresult){
    if(err){
      return result(err, null)
    } else if(queryresult.length == 1){ //we have a valid result!
      return result(null, queryresult[0].code);
    } else if (queryresult.length == 0){ //We don't have a valid result yet so we generate one.

      //Did not return yet => now we have to generate a code ourselves.
      var code = cryptoRandomString({length: 8});

      sql.query("INSERT INTO personnel_codes SET userid = ?, code = ?", [userId, code], function(err,queryresult){
        if (err) {
           //duplicate entry, very rare error but might wanna clarify if it happens, can just try again in this case.
          if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
              return result("Please try again, there was a duplicate code in the database. (mysqlcode 1062)",null);
          }else{ //different errors
            return result(err, null);
          }
        } else { //eyy no errors, succesfully made a new code. Return it to user.
          return result(null, code);
        }
      });

    } else { //Ya idk too many queryresult entries. So I guess we gotta give an error.
      return result("Something unknown went wrong.", null);
    }
  });

};
module.exports= User;
