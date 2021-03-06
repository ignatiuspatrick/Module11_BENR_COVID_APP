'user strict';
var User = require('../model/userModel');
var jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');
const uuid = require('uuid');

/**
 *  POST /users
 *  Create a new customer.
 *
 *  Body:
 *  notification_token - token to use for recieving notifications
 */
exports.create_user = function(req, res){
  //handles null error
  req.body.id = uuid.v4();
  var newUser = new User(req.body);
  User.createCustomer(newUser, function(err, user) {
  if (err){
    res.send({error: true, message: err});
    } else {
      //Send TOKEN
      var token = jwt.sign({
        id: newUser.id,
      }, SECRET_KEY, {expiresIn: "2y"});
      console.log(token);
      res.status(200).json({token: token});
    }
  });
};

/*
exports.get_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.getUser(req.params.userId, function(err,user){
    if(err){
      res.status(400).send({error: true, message: err});
    }else{
      res.status(200).json(user);
    }
  });
};
exports.update_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.updateUser(req.params.userId, new User(req.body), function(err,user){
    if(err){
      res.status(400).send({error: true, message: err});
    }else{
      res.status(200).json(user);
    }
  });
};
exports.delete_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.deleteUser(req.params.userId, function(err,user){
    if(err){
      res.status(400).send({error: true, message: err});
    }else{
      res.status(200).json({ message: 'User successfully removed' });
    }
  });
};
*/

/**
 *  POST /users/getsscode/:userId
 *  Create a new customer.
 *
 *  Protected:
 *  Customer
 *
 *  Param:
 *  userId - id of the customer
 *
 */
exports.get_securecode = function(req,res){
  if(!req.params.userId){
    return res.status(400).send({error: true, message: 'No id provided.'});
  } else if(req.params.userId != req.body.userid) {
    return res.status(400).send({error: true, message: 'Access denied. Wrong id provided.'});
  }
  User.generateCode(req.params.userId, function(err,code){
    if(err){
      res.status(400).send({error: true, message: err});
    } else {
      res.status(200).json({code: code});
    }
  });
};

//mark user as infected in DB, and subsequently mark users that are at risk..
exports.mark_user = function(req, res){
  var code = req.body.code;

  if(!code || code.length != 8){
    return res.status(400).send({error: true, message: 'Please provide the correct code!'});
  }

  code = code.toUpperCase(); //just to be sure.
  User.markUser(code, function(err, result){
    if(err){
      res.status(400).send({error: true, message: err});
    } else {
      console.log(result);
      res.status(200).send({success: result})
    }
  });
};
