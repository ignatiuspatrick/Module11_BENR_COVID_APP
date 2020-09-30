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
    this.email = superuser.email;
    this.phonenumber = superuser.phonenumber;
    this.city = superuser.city;
    this.streetname = superuser.streetname;
    this.housenumber = superuser.housenumber;
    this.postalcode = superuser.postalcode;
    this.type = superuser.type;
};

Superuser.createSuperuser = function (newSuperuser, result) {

  //Asynchronous approach so that it is faster.
  bcrypt.hash(newSuperuser.password, saltRounds).then(function(hash){
    newSuperuser.password = hash; //replace with hash before storing
    sql.query("INSERT INTO superusers SET ?", newSuperuser, function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          result(null, res.insertId);
      }
    });
  });

};

Superuser.loginSuperuser = function(username, password, type, result){
  sql.query('SELECT password FROM superusers WHERE username = ?', username, function(err, queryresult, fields) {
      if(err){

        console.log("error: ", err);
        result(err, null);

      } else {
        let hash = queryresult[0].password;

        if(!hash){
          result("No results", null);
        }

        bcrypt.compare(password, hash).then(function(success) {
          result(null, success);
        }).catch((error) => {
          result(error,'Promise error');
        });
      }
  });



};

module.exports = Superuser;
