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
  sql.query("SELECT code FROM ggd_codes WHERE id = ? AND created_at >= now() + INTERVAL 1 DAY;", userId, function(err,res){
    // TODO: Fix this. generates new one each time.
    console.log(res);
    if(err){
      return result(err, null);
    }else if(res.length > 0){
      return result(null, res);
    }
  });

  //Did not return yet => now we have to generate a code ourselves.
  let temp_code = cryptoRandomString({length: 8, type: 'distinguishable'});
  console.log(temp_code);
  sql.query("INSERT INTO ggd_codes SET userid = ?, code = ?", [userId, temp_code], function(err,res){
    if (err) {
        if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){ //duplicate entry, very rare error but might wanna clarify if it happens
          return result("Please try again, there was a duplicate code in the database.",null);
      }else{
        return result(err, null);
      }
    } else {
      return result(null, temp_code);
    }
  });

}

module.exports= User;
