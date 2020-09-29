'user strict';
var sql = require('../../db.js');

//User object constructor, needs more fields
var User = function(user){
    this.token = user.token;
};

User.createUser = function (newUser, result) {
        sql.query("INSERT INTO users set ?", newUser, function (err, res) {
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
User.getUser = function (userId, result) {
    sql.query("SELECT userid,token FROM users WHERE userid = ?", userId, function (err, res) {
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
    sql.query("UPDATE users SET token = ? WHERE userid = ?", [user.token,userId], function (err, res) {
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
    sql.query("DELETE FROM users WHERE userid = ?", userId, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
};

module.exports= User;