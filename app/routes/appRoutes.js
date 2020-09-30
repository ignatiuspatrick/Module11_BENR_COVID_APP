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
  //(Customer/Restaurant personnel)
  var users = require('../controller/userController');
  app.route('/users')
  .post(users.create_user);
  app.route('/users/:userId')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);

  //SUPER USER
  //(Sanitary services & Restaurant owners)

  var superusers = require('../controller/superuserController');
  app.route('/superusers/create').post(superusers.create_superuser);
  app.route('/superusers/login').post(superusers.login_superuser);

  //CHECK-INS
  var checkins = require('../controller/checkinController');
  app.route('/checkin').post(checkins.create_checkin);

    //checkout
    //to test, send post request as such: localhost:5000/checkout/1/
  app.route('/checkout/:checkinId').post(checkins.checkout_checkin);
};
