'use strict';
module.exports = function(app){

  //RESTAURANTS
  var restaurants = require('../controller/restaurantController');
  app.route('/restaurants')
  .get(restaurants.get_all_restaurants)
  .post(restaurants.create_restaurant);
  app.route('/restaurants/:restaurantId')
  .get(restaurants.get_restaurant)
  .put(restaurants.update_restaurant)
  .delete(restaurants.delete_restaurant);

  //USERS
  var users = require('../controller/userController');
  app.route('users/:userId')
  .post(users.create_user);
  /*  .get(users.get_user)
    .put(users.update_user)
    .delete(users.delete_user);*/

  //CHECK-INS
  var checkins = require('../controller/checkinController');
  app.route('/checkin')
  .post(checkins.create_checkin);
};
