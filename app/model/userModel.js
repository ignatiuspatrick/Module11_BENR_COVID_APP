'user strict';
var sql = require('../../sql.js');


/*  app.route('users').post(users.create_user);
  app.route('users/:userId')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);*/

//User object constructor, needs more fields
var User = function(user){
    this.user = user.user;
};

User.createUser = function (newUser, result) {
        sql.query("", newUser, function (err, res) {

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
