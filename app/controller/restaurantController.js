'user strict';
var Restaurant = require('../model/restaurantModel');
const isNull = (value) => typeof value === "object" && !value


exports.get_all_restaurants = function(req, res) {
  Restaurant.getAllRestaurants(function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.send(restaurant);
  });
};

exports.create_restaurant = function(req, res) {
  var newRestaurant = new Restaurant(req.body);
  //handles null error
   if(!newRestaurant.name || !newRestaurant.location || !newRestaurant.contact){
     res.status(400).send({ error:true, message: 'Please provide more information.'});
   } else {
    Restaurant.createRestaurant(newRestaurant, function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.json(restaurant);
  });
}
};

exports.get_restaurant = function(req, res) {
  Restaurant.getRestaurant(req.params.restaurantId, function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.json(restaurant);
  });
};


exports.update_restaurant = function(req, res) {
  Restaurant.updateRestaurant(req.params.restaurantId, new Restaurant(req.body), function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.json(restaurant);
  });
};


exports.delete_restaurant = function(req, res) {
  Restaurant.deleteRestaurant(req.params.restaurantId, function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.json({ message: 'Restaurant successfully deleted' });
  });
};


exports.get_qrcode = function(req, res){
  //generate code
  //return to thingy
  if(!req.params.restaurantId){
    return res.send({error: true, message: 'Please supply a restaurantId.'});
  }
  Restaurant.generateQR(req.params.restaurantId, function(err, code) {
    if(err){
      return res.send({error: true, message: err});
    } else {
      res.status(200).send({code: code})
    }
  });
};
