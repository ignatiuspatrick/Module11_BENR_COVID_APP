'user strict';
var User = require('../model/userModel');


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

exports.get_user = function(req,res){
  User.getUser(req.params.userId, function(err,user){
    if(err){
      res.send(err);
    }else{
      res.json(user);
    }
  });
};
exports.update_user = function(req,res){
  User.updateUser(req.params.userId, new User(req.body), function(err,user){
    if(err){
      res.send(err);
    }else{
      res.json(user);
    }
  });
};
exports.delete_user = function(req,res){
  User.deleteUser(req.params.userId, function(err,user){
    if(err){
      res.send(err);
    }else{
      res.json({ message: 'User successfully removed' });
    }
  });
};


