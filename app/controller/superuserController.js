'user strict';
var Superuser = require('../model/superuserModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');


//Register a superuser
exports.create_superuser = function(req, res){
  var newSuperuser = new Superuser(req.body);
  var passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //handles errors
  if(!(newSuperuser.type == "sanitary_service" || newSuperuser.type == "restaurant_owner")){
    res.status(400).send({ error:true, message: 'Please provide type of user.'});
  } else if (!newSuperuser.password || !newSuperuser.username || !newSuperuser.email){
    res.status(400).send({ error:true, message: 'Please provide login information of user.'});
  } else if (newSuperuser.password !== newSuperuser.confirm){
    res.status(400).send({ error:true, message: 'Passwords do not match.'});
  }else if (!passwordcheck.test(newSuperuser.password)){
    res.status(400).send({ error:true, message: 'Please provide at least 8 character long password with at least one uppercase letter, special character and number.'});
  }else if (newSuperuser.email.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide an e-mail under 100 characters.'});
  }else if (newSuperuser.password.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a password under 100 characters.'});
  }else if (newSuperuser.username.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a username under 100 characters.'});
  }else{
    Superuser.createSuperuser(newSuperuser, function(err, superuser) {
      if (err){
        res.send({ error:true, message: err});
      } else {
        console.log('Created superuser with id ' + superuser);
        if(newSuperuser.type === "restaurant_owner"){
          res.status(200).send({id:superuser});
        }else{
          res.status(200).send({message:"Success!"});

        }
      }
    });
  }

};

exports.checkValidRestid = function(req,res,next) {
  Superuser.checkValidRestid(req.body.ownerid, req.body.restid, function(err, restid) {
    if (err){
      return res.status(400).send({error: true, message: err});
    } else {
      if (restid == 0) {
        console.log(restid)
        return res.status(401).send({message:'Invalid restaurant id.'});
      }
      next();
    }
  });
}

exports.visited = function(req,res) {
    Superuser.visited(req.body.restid, req.body.days, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

exports.infected = function(req,res) {
    Superuser.infected(req.body.days, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

exports.marked = function(req,res) {
    Superuser.marked(req.body.days, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

exports.infectedrestaurants = function(req,res) {
    Superuser.infectedrestaurants(req.body.days, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

exports.listInfections = function(req,res) {
    Superuser.listInfections(req.body.restid, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

exports.getrestids = function(req,res) {
    Superuser.getrestids(req.body.ownerid, function(err, success) {
      if (err){
        res.status(400).send({error: true, message: err});
      } else {
        return res.status(200).send({result: success});
      }
    });
}

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
      console.log(success);
      if(success != -1){
        var token = jwt.sign({
          id: success,
          type: type,
        }, SECRET_KEY, {expiresIn: "1h"});
        console.log(token);
        var tokenExpire = new Date(Date.now() + 32400000);
        // by sending a cookie instead of body, we will be stateless, see more:
        // https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle
        if(type == "restaurant_owner"){
          res.status(200).cookie('tokenro', token, {expires: tokenExpire, httpOnly: true, sameSite: 'None'}).send();
        } else if (type == "sanitary_service"){
          res.status(200).cookie('tokenss', token, {expires: tokenExpire, httpOnly: true, sameSite: 'None'}).send();
        }
      } else {
        res.status(401).send({message:'Login has failed. Please try again.'});
      }
    });
  }
};

exports.logout_ro = function(req,res){

  // can do some checks with req.cookies.token
  // now only remove cookie from client side.
  // even if this cookie is deleted at client side, it is still possible to steal session
  // so we need to invalidate these tokens at back end
  var tokenro = req.cookies.tokenro || '';
  console.log("cookie ro cleared: " + tokenro);
  res.status(200).clearCookie('tokenro', {httpOnly: true, sameSite: 'None'}).send();

};

exports.logout_ss = function(req,res){
  var tokenss = req.cookies.tokenss || '';
  console.log("cookie ss cleared: " + tokenss);
  res.status(200).clearCookie('tokenss', {httpOnly: true, sameSite: 'None'}).send();
};
exports.get_ro_id = function(req,res){
  var tokenro = req.cookies.tokenro || '';
  var decoded = jwt.decode(tokenro , {complete: true});
  console.log(decoded.payload.id);
  var id = decoded.payload.id;
  return res.status(200).send({id:id});
};
