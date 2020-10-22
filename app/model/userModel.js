'user strict';
var sql = require('../../db.js');
const cryptoRandomString = require('crypto-random-string');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const { Expo } = require('expo-server-sdk');
let expo = new Expo();

//User object constructor. This is sufficient for Customers.
var User = function(user){
  this.id = user.id;
  this.notification_token = user.notification_token
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
  const atRisk = `SELECT DISTINCT u.notification_token
  FROM checkin c1, checkin c2, users u
  WHERE u.id = c2.userid AND
   c1.userid = (SELECT userid FROM ggd_codes WHERE code = ? AND created_at > timestampadd(hour, -24, now())) AND c1.restid = c2.restid
    AND ((c2.checkin_time > c1.checkin_time AND c2.checkin_time < c1.checkout_time)
      OR (c1.checkin_time > c2.checkin_time AND c1.checkin_time < c2.checkout_time))`
  // Send notifications to all users at risk
  sql.query(atRisk, [code], function(err, queryresult){
    if (err){
      return result(err, null)
    }
    console.log(`Users at risk to notify: ${JSON.stringify(queryresult)}`)
    if (queryresult){
      queryresult.forEach((item, i) => {
        let messages = [];
        messages.push({
          to: item.notification_token,
          sound: 'default',
          title: 'You have been marked at risk!',
          body: '',
          data: { timestamp },
        })
        let chunks = expo.chunkPushNotifications(messages);
        (async () => {
          // Send the chunks to the Expo push notification service. There are
          // different strategies you could use. A simple one is to send one chunk at a
          // time, which nicely spreads the load out over time:
          for (let chunk of chunks) {
            try {
              expo.sendPushNotificationsAsync(chunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
            } catch (error) {
              console.error(error);
            }
          }
        })();
      });


      console.log('Successfully sent notifications to all at risk people!')
  }
  })
  const query = `UPDATE users
    SET at_risk = 1, at_risk_since = ?
    WHERE id IN (SELECT DISTINCT c2.userid
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
User.getMarkedUsers = function(days,result){
  var startDay = new Date(new Date().toDateString());
  var endDay = new Date(startDay);
  startDay.setHours(startDay.getHours() - 24 * days)
  endDay.setHours(endDay.getHours() + 24);
  sql.query("SELECT COUNT(id) as c FROM users WHERE infected = 1 AND at_risk_since >= ? AND at_risk_since < ?",[startDay,endDay], function(err,res){
    if(err) {
      console.log("error: ", err);
      result("SQL error, check logs.", null);
      return;
  }
  else {
      result(null, res[0].c);
  }
  })



}

module.exports= User;
