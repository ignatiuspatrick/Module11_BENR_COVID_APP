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
