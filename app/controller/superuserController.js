'user strict';
var Superuser = require('../model/superuserModel');
var Restaurant = require('../model/restaurantModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');


//Register a superuser
exports.create_superuser = function(req, res){
  var newSuperuser = new Superuser(req.body);
  Superuser.createSuperuser(newSuperuser, function(err, superuser) {
    if (err){
      res.status(400).send({ error:true, message: err});
    } else {
      console.log('Created superuser with id ' + superuser);
      if(req.body.type === "restaurant_owner") {
        var newRestaurant = new Restaurant(req.body);
        console.log()
        newRestaurant.ownerid = superuser;
        Restaurant.createRestaurant(newRestaurant, function(err){
          if (err){
            return res.status(400).send(err);
          }
        })
        res.status(200).send({message:"Success!"});
      }else{
        res.status(200).send({message:"Success!"});
      }
    }
  });
};

exports.create_superuser_check = function(req, res, next) {
  var passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  var sanser = "sanitary_service";
  req.body.sanser = 0

  if(!(req.body.type == sanser || req.body.type == "restaurant_owner")){
    return res.status(400).send({ error:true, message: 'Please provide type of user.'});
  } else if (!req.body.password || !req.body.username || !req.body.email){
    return res.status(400).send({ error:true, message: 'Please provide login information of user.'});
  } else if (req.body.password !== req.body.confirm){
    return res.status(400).send({ error:true, message: 'Passwords do not match.'});
  }else if (!passwordcheck.test(req.body.password)){
    return res.status(400).send({ error:true, message: 'Please provide at least 8 character long password with at least one uppercase letter, special character and number.'});
  }else if (req.body.email.length >= 100){
    return res.status(400).send({ error:true, message: 'Please provide an e-mail under 100 characters.'});
  }else if (req.body.password.length >= 100){
    return res.status(400).send({ error:true, message: 'Please provide a password under 100 characters.'});
  }else if (req.body.username.length >= 100){
    return res.status(400).send({ error:true, message: 'Please provide a username under 100 characters.'});
  }

  if(req.body.type == sanser) {
    req.body.sanser = 1
  }

  next();
}

exports.checkValidRestid = function(req,res,next) {
  var restid = -1;
  if(req.params.restaurantId) {
    restid = req.params.restaurantId
  } else if(req.body.restid) {
    restid = req.body.restid
  }
  Superuser.checkValidRestid(req.body.ownerid, restid, function(err, restid) {
    if (err){
      return res.status(400).send({error: true, message: err});
    } else {
      if (restid == 0) {
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
        var tokenExpire = new Date(Date.now() + 3600000);
        // by sending a cookie instead of body, we will be stateless, see more:
        // https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle
        if(type == "restaurant_owner"){
          res.status(200).cookie('tokenro', token, {expires: tokenExpire, httpOnly: true}).send();
        } else if (type == "sanitary_service"){
          res.status(200).cookie('tokenss', token, {expires: tokenExpire, httpOnly: true}).send();
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
  res.status(200).clearCookie('tokenro', {httpOnly: true}).send();

};

exports.logout_ss = function(req,res){
  var tokenss = req.cookies.tokenss || '';
  console.log("cookie ss cleared: " + tokenss);
  res.status(200).clearCookie('tokenss', {httpOnly: true}).send();
};
exports.get_ro_id = function(req,res){
  var tokenro = req.cookies.tokenro || '';
  var decoded = jwt.decode(tokenro , {complete: true});
  console.log(decoded.payload.id);
  var id = decoded.payload.id;
  return res.status(200).send({id:id});
};
