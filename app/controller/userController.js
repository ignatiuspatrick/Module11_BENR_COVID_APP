'user strict';
var User = require('../model/userModel');

// app.route('users').post(users.create_user);
// app.route('users/:userId')
// .get(users.get_user)
// .put(users.update_user)
// .delete(users.delete_user);

exports.create_user = function(req, res){
  var newUser = new User(req.body);

  //handles null error
   if(false){
     res.status(400).send({ error:true, message: 'Please provide more information.'});

  } else {

  User.createUser(newUser, function(err, user) {
    if (err){
      res.send(err);
    }
    res.json(user);
  });
}
};
