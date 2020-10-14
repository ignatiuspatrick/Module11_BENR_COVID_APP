'user strict';
var Superuser = require('../model/superuserModel');
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');


//Register a superuser
exports.create_superuser = function(req, res){
  var newSuperuser = new Superuser(req.body);

  var passwordcheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  var phonenumbercheck = /^[0-9]*$/

  //handles errors
  if(!(newSuperuser.type == "sanitary_service" || newSuperuser.type == "restaurant_owner")){
    res.status(400).send({ error:true, message: 'Please provide type of user.'});
  } else if (!newSuperuser.password || !newSuperuser.username){
    res.status(400).send({ error:true, message: 'Please provide login information of user.'});
  } else if (!passwordcheck.test(newSuperuser.password)){
    res.status(400).send({ error:true, message: 'Please provide a at least 8 character long password with at least one uppercase letter, special character and number.'});
  } else if (!phonenumbercheck.test(newSuperuser.phonenumber)){
    res.status(400).send({ error:true, message: 'Please provide a phone number without letters or special characters.'});
  } else if (!newSuperuser.email || !newSuperuser.phonenumber){
    res.status(400).send({ error:true, message: 'Please provide properly formatted contact information.'});
  }else if (!newSuperuser.city || !newSuperuser.streetname || !newSuperuser.housenumber || !newSuperuser.postalcode){
    res.status(400).send({ error:true, message: 'Please provide properly formatted location details.'});
  } else if (newSuperuser.postalcode.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a postal code under 100 characters.'});
  } else if (newSuperuser.housenumber.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a house number under 100 characters.'});
  } else if (newSuperuser.streetname.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a street name under 100 characters.'});
  } else if (newSuperuser.city.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a city under 100 characters.'});
  } else if (newSuperuser.phonenumber.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a phone number under 100 characters.'});
  } else if (newSuperuser.email.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide an e-mail under 100 characters.'});
  } else if (newSuperuser.password.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a password under 100 characters.'});
  } else if (newSuperuser.username.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a username under 100 characters.'});
  }else{
    Superuser.createSuperuser(newSuperuser, function(err, superuser) {
      if (err){
        res.send({ error:true, message: err});
      } else {
        console.log('Created superuser with id ' + superuser);
        res.status(200).send({message: 'Registration succesful! Redirect.'});
        // TODO: Redirect user to login/success page
      }
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
      console.log(success);
      if(success != -1){
        var token = jwt.sign({
          id: success,
          type: type,
        }, SECRET_KEY, {expiresIn: "9h"});
        console.log(token);
        var tokenExpire = new Date(Date.now() + 32400000);
        // by sending a cookie instead of body, we will be stateless, see more:
        // https://dev.to/mr_cea/remaining-stateless-jwt-cookies-in-node-js-3lle
        if(type == "restaurant_owner"){
          res.status(200).cookie('tokenro', token, {expires: tokenExpire, httpOnly: true, sameSite: 'Lax'}).send();
        } else if (type == "sanitary_service"){
          res.status(200).cookie('tokenss', token, {expires: tokenExpire, httpOnly: true, sameSite: 'Lax'}).send();
        }
      } else {
        res.status(401).send({message:'Login has failed. Please try again.'});
      }
    });
  }
};

exports.logout_ro = function(req,res){

  //can do some checks with req.cookies.token
  // now only remove cookie from client side.
  // even if this cookie is deleted at client side, it is still possible to steal session
  // so we need to invalidate these tokens at back end
  var tokenro = req.cookies.tokenro || '';
  console.log("cookie ro cleared: " + req.cookies.tokenro);
  res.status(200).clearCookie('tokenro', {httpOnly: true, sameSite: 'Lax'}).send();

};

exports.logout_ss = function(req,res){
  var tokenss = req.cookies.tokenss || '';
  console.log("cookie ss cleared: " + req.cookies.tokenss);
  res.status(200).clearCookie('tokenss', {httpOnly: true, sameSite: 'Lax'}).send();
};


exports.link_personnel = function(req, res){
  if(!req.params.code){
    return res.status(400).send({error: true, message: "Missing code."})
  }

  Superuser.linkPersonnel(code, function(err, result){
    if(err){
      return res.status(400).send({error: true, message: err});
    } else {
      return res.status(200).send({success: true});
    }
  });
}
