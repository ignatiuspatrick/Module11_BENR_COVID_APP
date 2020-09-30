'user strict';
var Superuser = require('../model/superuserModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');


//Register a superuser
exports.create_superuser = function(req, res){
  var newSuperuser = new Superuser(req.body);

  //handles errors
  // TODO: REGEX checks (e.g. password long enough, postalcode, email)
  if(!(newSuperuser.type == "sanitary_service" || newSuperuser.type == "restaurant_owner")){
    res.status(400).send({ error:true, message: 'Please provide type of user.'});
  } else if (!newSuperuser.password || !newSuperuser.username){
    res.status(400).send({ error:true, message: 'Please provide login information of user.'});
  } else if (!newSuperuser.email || !newSuperuser.phonenumber){
    res.status(400).send({ error:true, message: 'Please provide properly formatted contact information.'});
  }else if (!newSuperuser.city || !newSuperuser.streetname || !newSuperuser.housenumber || !newSuperuser.postalcode){
    res.status(400).send({ error:true, message: 'Please provide properly formatted location details.'});
  }else{
  Superuser.createSuperuser(newSuperuser, function(err, superuser) {
    if (err){
      res.send(err);
    }
    console.log('Created superuser with id ' + superuser);
    res.status(200).send({message: 'Registration succesful! Redirect.'});
    // TODO: Redirect user to login/success page
  });
}

};

exports.login_superuser = function(req, res){
  var username = req.body.username;
  var password = req.body.password;
  var type = req.body.type;

  if(!username || !password){
    res.status(400).send({error: true, message: 'Please fill in the required fields to log in.'});
  } else if (!(type == "sanitary_service" || type == "restaurant_owner")){
    res.status(400).send({error: true, message:'Please specifiy the type of login.'});
  } else {
    Superuser.loginSuperuser(username, password, type, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      }

      //SEND TOKEN
      if(success){
        var token = jwt.sign({
          username: username,
          type: type,
        }, SECRET_KEY, {expiresIn: "9h"});
        console.log(token);
        res.status(200).json(token);
      } else {
        res.status(401).send({message:'Login has failed. Please try again.'});
      }
    });
  }
};
