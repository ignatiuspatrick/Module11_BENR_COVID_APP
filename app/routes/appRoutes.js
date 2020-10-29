'use strict';
const { verifyRestaurantOwner, verifySanitaryService } = require('./verify');
const verify = require('./verify');



module.exports = function(app){

  var restaurants = require('../controller/restaurantController');
  var checkins = require('../controller/checkinController');
  var users = require('../controller/userController');
  var superusers = require('../controller/superuserController');

  app.route('/restaurants')
  //.get(restaurants.get_all_restaurants)
  .post(verify.verifyRestaurantOwner, restaurants.create_restaurant_check, restaurants.create_restaurant);
  app.route('/restaurants/:restaurantId')
  .put(verify.verifyRestaurantOwner, restaurants.create_restaurant_check,restaurants.update_restaurant)
  //.delete(verify.verifyRestaurantOwner, restaurants.delete_restaurant);
  app.post('/restaurants/getrest', verify.verifyRestaurantOwner,restaurants.get_restaurant);


  app.route('/users')
  .post(users.create_user);

  //app.route('/users/:userId')
  //.get(users.get_user);
  //.put(, users.update_user)
  //.delete(users.delete_user);

  app.get('/users/getsscode/:userId', verify.verifyCustomer, users.get_securecode); //Dis for GGD code
  app.post('/users/checkin', verify.verifyCustomer, checkins.create_checkin);

  app.route('/superusers/create').post(superusers.create_superuser_check, restaurants.create_restaurant_check, superusers.create_superuser);
  app.route('/superusers/login').post(superusers.login_superuser);
  app.route('/superusers/visited').post(verify.verifyRestaurantOwner, superusers.checkValidRestid, superusers.visited);
  app.route('/superusers/listinfections').post(verify.verifyRestaurantOwner, superusers.checkValidRestid, superusers.listInfections);
  app.route('/restaurants/gettos').post(verify.verifyRestaurantOwner, superusers.checkValidRestid, restaurants.get_timeofstay);
  app.route('/restaurants/settos').post(verify.verifyRestaurantOwner, superusers.checkValidRestid, restaurants.set_timeofstay);
  app.route('/superusers/restaurants').get(verify.verifyRestaurantOwner, superusers.getrestids);
  //This route gives back the QRcode code that is already in the DB for the restaurant (and if not exists, make one)
  app.route('/restaurants/getqr/:restaurantId').get(verify.verifyRestaurantOwner, superusers.checkValidRestid,restaurants.get_qrcode);
  //This route generates a new QRcode code for the restaurant
  app.route('/restaurants/generateqr/:restaurantId').get(verify.verifyRestaurantOwner, superusers.checkValidRestid,restaurants.generate_qrcode);
  // app.post('/superusers/markinfected', verify.verifySanitaryService, users.mark_user);
  app.post('/superusers/markinfected',verifySanitaryService, users.mark_user);
  app.route('/superusers/infected').post(verify.verifySanitaryService, superusers.infected);
  app.route('/superusers/infectedrestaurants').post(verify.verifySanitaryService, superusers.infectedrestaurants);
  app.route('/superusers/marked').post(verify.verifySanitaryService, superusers.marked);
  app.post('/superusers/logout/ro',verify.verifyRestaurantOwner, superusers.logout_ro);
  app.post('/superusers/logout/ss',verify.verifySanitaryService, superusers.logout_ss);
  app.post('/superusers/checkToken/ro', verify.verifyRestaurantOwner, (req,res) =>{
    res.status(200).send();
  });
  app.get('/superusers/getid',verify.verifyRestaurantOwner,superusers.get_ro_id);
  app.post('/superusers/checkToken/ss', verify.verifySanitaryService, (req,res) =>{
    res.status(200).send();
  });



};
