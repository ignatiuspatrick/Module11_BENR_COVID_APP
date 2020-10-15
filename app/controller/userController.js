'user strict';
var User = require('../model/userModel');
var jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');
const uuid = require('uuid');

var passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

exports.create_user = function(req, res){
  //handles null error
  if (!(req.body.type == 'customer' || req.body.type == 'personnel')){
    res.status(400).send({ error:true, message: 'Please provide a valid user type.'});
  } else {
    if(req.body.type=='customer'){
      req.body.id = uuid.v4();
      var newUser = new User(req.body);
      User.createCustomer(newUser, function(err, user) {
      if (err){
        res.send({error: true, message: err});
      } else {
        //Send TOKEN
        var token = jwt.sign({
          id: newUser.id,
          type: newUser.type
        }, SECRET_KEY, {expiresIn: "2y"});
        console.log(token);
        res.status(200).json({token: token});
      }

    });
  } else{
    var userId = uuid.v4();
    if(!passwordcheck.test(req.body.password)){ //check password regex
      return res.status(400).send({error: true, message: "Invalid password format."});
    } else if(!req.body.email){
      return res.status(400).send({error: true, message: 'No email provided!'});
    }

    User.createPersonnel(req.body.id, req.body.type, req.body.email, req.body.password,function(err, result){
      if (err){
        res.send({error: true, message: err});
      } else {
        //Send success
        res.status(200).json({success: true, userId: result});
      }
    });
  }
}
};

//This should login a Personnel user
exports.login_personnel = function(req, res){
  if(!req.body.email || !req.body.password){
    return res.status(400).send({error: true, message: "Oops, please provide all the right credentials."});
  }

  User.signInPersonnel(req.body.email, req.body.password, function(err, success){
    if(err){
      return res.status(401).send({message:"Something went wrong while trying to log in."});
    }else{

      //Lets check if truly everything went right!
      if(!success){
        return res.status(400).send({message: "Failed login attempt."});
      } else {

        //All gucci, now return token.
        var token = jwt.sign({
          id: success,
          type: 'personnel',
        }, SECRET_KEY, {expiresIn: "1h"});
        //expires in 1 hr
        var tokenExpire = new Date(Date.now() + 32400000);
        res.status(200).send({token: token, expires: tokenExpire});
      }

    }
  });

};

exports.get_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.getUser(req.params.userId, function(err,user){
    if(err){
      res.send({error: true, message: err});
    }else{
      res.json(user);
    }
  });
};
exports.update_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.updateUser(req.params.userId, new User(req.body), function(err,user){
    if(err){
      res.send({error: true, message: err});
    }else{
      res.json(user);
    }
  });
};
exports.delete_user = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.deleteUser(req.params.userId, function(err,user){
    if(err){
      res.send({error: true, message: err});
    }else{
      res.json({ message: 'User successfully removed' });
    }
  });
};

exports.get_securecode = function(req,res){
  if(!req.params.userId){
    return res.send({error: true, message: 'No id provided.'});
  }
  User.generateCode(req.params.userId, function(err,code){
    if(err){
      res.send({error: true, message: err});
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

exports.get_linkcode = function(req, res){
  if (!req.params.userId){
      return res.send({error: true, message: 'No id provided.'});
  }

  User.getLink(req.params.userId, function(err, code){
    if(err){
      res.send({error: true, message: err});
    }else{
      res.status(200).send({code: code});
    }
  });
};
