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

exports.get_not_selected = function(req, res) {
  Restaurant.getNotSelected(function(err, restaurant) {
    if (err){
      res.send(err);
    }
    res.send(restaurant);
  });
};

exports.create_restaurant = function(req, res) {
  var newRestaurant = new Restaurant(req.body);
  
  var phonenumbercheck = /^[0-9]*$/
  //handles null error
   if(!newRestaurant.name || !newRestaurant.streetname || !newRestaurant.number || !newRestaurant.postalcode || !newRestaurant.city){
     res.status(400).send({ error:true, message: 'Please provide more information.'});
   }
  else if (!newRestaurant.number){
    res.status(400).send({ error:true, message: 'Please provide properly formatted contact information.'});
  }
  else if (!newRestaurant.city || !newRestaurant.streetname || !newRestaurant.number || !newRestaurant.postalcode){
    res.status(400).send({ error:true, message: 'Please provide properly formatted location details.'});
  } 
  else if (newRestaurant.postalcode.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a postal code under 100 characters.'});
  } 
  else if (newRestaurant.number.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a house number under 100 characters.'});
  } 
  else if (newRestaurant.streetname.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a street name under 100 characters.'});
  } 
  else if (newRestaurant.city.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a city under 100 characters.'});
  } 
  else if (newRestaurant.number.length >= 100){
    res.status(400).send({ error:true, message: 'Please provide a phone number under 100 characters.'});
  }  
   else {
    Restaurant.createRestaurant(newRestaurant, function(err, restaurant) {
    if (err){
      return res.send(err);
    }
    res.json(restaurant);
  });
}
};

exports.get_restaurant = function(req, res) {
  Restaurant.getRestaurant(req.body.ownerid, function(err, restaurant) {
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
