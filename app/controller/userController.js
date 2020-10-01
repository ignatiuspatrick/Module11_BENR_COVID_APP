'user strict';
var User = require('../model/userModel');
var jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');

exports.create_user = function(req, res){
  var newUser = new User(req.body);
  console.log(newUser);
  //handles null error
  if(!newUser.userId){
    res.status(400).send({ error:true, message: 'Please provide a unique UserId.'});
  } else if (!(newUser.type == 'customer' || newUser.type == 'personnel')){
    res.status(400).send({ error:true, message: 'Please provide a valid user type (customer/personnel).'});
  } else {

    User.createUser(newUser, function(err, user) {
    if (err){
      res.send(err);
    } else {
      //Send TOKEN
      // TODO: Refresh token
      var token = jwt.sign({
        userId: newUser.userId,
        type: newUser.type
      }, SECRET_KEY, {expiresIn: "2y"});
      console.log(token);
      res.status(200).json({token: token});
    }

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
