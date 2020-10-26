'user strict';
const { request } = require('express');
var Restaurant = require('../model/restaurantModel');
const isNull = (value) => typeof value === "object" && !value


exports.get_all_restaurants = function(req, res) {
  Restaurant.getAllRestaurants(function(err, restaurant) {
    if (err){
      return res.status(400).send({message: "Something went wrong."});
    }
    res.status(200).send(restaurant);
  });
};

exports.get_not_selected = function(req, res) {
  Restaurant.getNotSelected(function(err, restaurant) {
    if (err){
      return res.status(400).send({message: "Something went wrong."});
    }
    res.status(200).send(restaurant);
  });
};

exports.create_restaurant = function(req, res) {
  var newRestaurant = new Restaurant(req.body);
  Restaurant.createRestaurant(newRestaurant, function(err, restaurant) {
  if (err){
    return res.status(400).send({message: "Something went wrong."});
  }
  res.status(200).send({message:"Success!"});
  });
};

exports.create_restaurant_check = function(req, res, next) {
  if (!req.body.sanser || req.body.sanser == 0) {
    if (!req.body.name || !req.body.streetname || !req.body.number || !req.body.postalcode || !req.body.city){
      return res.status(400).send({ error:true, message: 'Please provide more information.'});
    } else if (req.body.name.length >= 100){
      return res.status(400).send({ error:true, message: 'Please provide a name under 100 characters.'});
    } else if (req.body.postalcode.length >= 100){
     return res.status(400).send({ error:true, message: 'Please provide a postal code under 100 characters.'});
   } else if (req.body.number.length >= 100){
     return res.status(400).send({ error:true, message: 'Please provide a house number under 100 characters.'});
   } else if (req.body.streetname.length >= 100){
     return res.status(400).send({ error:true, message: 'Please provide a street name under 100 characters.'});
   } else if (req.body.city.length >= 100){
     return res.status(400).send({ error:true, message: 'Please provide a city under 100 characters.'});
   }
 }
 next();
}



exports.get_restaurant = function(req, res) {
  Restaurant.getRestaurant(req.body.ownerid, function(err, restaurant) {
    if (err){
      return res.send("Something went wrong.");
    }
    res.status(200).json(restaurant);
  });
};

exports.set_timeofstay = function(req, res) {
  var tos = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!tos.test(req.body.tos)){
    return res.status(400).send({ error:true, message: 'Please provide a time in the format 00:00.'});
  }
  Restaurant.settimeofstay(req.body.restid, req.body.tos, function(err, restaurant) {
    if (err){
      return res.send("Something went wrong.");
    }
    res.status(200).json(restaurant);
  });
};

exports.get_timeofstay = function(req, res) {
  Restaurant.gettimeofstay(req.body.restid, function(err, timeofstay) {
    if (err){
      return res.send("Something went wrong.");
    }
    return res.status(200).send({tos: timeofstay});
  });
};

exports.update_restaurant = function(req, res) {
  var newRestaurant = new Restaurant(req.body);
  Restaurant.updateRestaurant(req.params.restaurantId, newRestaurant, function(err, restaurant) {
    if (err){
      return res.status(400).send("Something went wrong.");
    }
    res.status(200).json(restaurant);
  });
}

exports.delete_restaurant = function(req, res) {
  Restaurant.deleteRestaurant(req.params.restaurantId, function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.status(200).json({ message: 'Restaurant successfully deleted' });
  });
};


exports.generate_qrcode = function(req, res){
  //generate code
  //return to thingy
  if(!req.params.restaurantId){
    return res.send({error: true, message: 'Please supply a restaurantId.'});
  }
  Restaurant.generateQR(req.params.restaurantId, function(err, code) {
    if(err){
      return res.send({error: true, message: "Something went wrong."});
    } else {
      res.status(200).send({code: code});
    }
  });
};

exports.get_qrcode = function(req, res){
  if(!req.params.restaurantId){
    return res.status(400).send({error: true, message: err});
  }
  Restaurant.getQR(req.params.restaurantId, function(err, code){
    if(err){
      return res.send({error: true, message: "Something went wrong."});
    } else {
      res.status(200).send({code: code});
    }
  });
};
