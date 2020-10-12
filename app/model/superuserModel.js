'user strict';
var sql = require('../../db.js');
const bcrypt = require('bcrypt');
const saltRounds = 12;


/*  app.route('users').post(users.create_user);
  app.route('users/:userId')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);*/

//superUser object constructor, needs more fields
var Superuser = function(superuser){
    this.username = superuser.username;
    this.password = superuser.password; //bcrypt this
    this.confirm = superuser.confirm;
    this.email=superuser.email;
    this.type = superuser.type;
};


//create a superuser. Does not log them in yet.
Superuser.createSuperuser = function (newSuperuser, result) {

  //Asynchronous approach so that it is faster.
  bcrypt.hash(newSuperuser.password, saltRounds).then(function(hash){
    newSuperuser.password = hash; //replace with hash before storing
    sql.query("INSERT INTO superusers SET username = ?, password=?, email=?,type=?", [newSuperuser.username, newSuperuser.password, newSuperuser.email, newSuperuser.type], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result("SQL error, check logs.", null);
          return;
      }
      else{
          result(null, res.insertId);
      }
    });
  });

};

Superuser.loginSuperuser = function(username, password, type, result){
  sql.query('SELECT password, id FROM superusers WHERE username = ? AND type = ?', [username,type], function(err, queryresult, fields) {
      if(err){
        console.log("error: ", err);
        result(err, -1);
      } else {
        if(queryresult.length>0){
          let hash = queryresult[0].password;
          bcrypt.compare(password, hash).then(function(success) {
            if(success) {
              result(null, queryresult[0].id);
            }else{
            result(null, -1);
            }
          }).catch((error) => {
            result(error,'Promise error');
          });
        }else{
          result(null, -1);
        }
      }
  });
};

module.exports = Superuser;
