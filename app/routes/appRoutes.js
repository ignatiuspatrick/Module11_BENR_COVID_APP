'use strict';
module.exports = function(app){
  var restaurants = require('../controller/restaurantController');

  app.route('/restaurants')
  .get(restaurants.get_all_restaurants).post(restaurants.create_restaurant);

  app.route('/restaurants/:restaurantId')
  .get(restaurants.get_restaurant)
  .put(restaurants.update_restaurant)
  .delete(restaurants.delete_restaurant);
};
