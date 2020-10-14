'use strict';
const { verifyRestaurantOwner } = require('./verify');
const verify = require('./verify');



module.exports = function(app){

  //old
  //RESTAURANTS
  var restaurants = require('../controller/restaurantController');
  app.route('/restaurants')
  .get(restaurants.get_all_restaurants)
  .post(verify.verifyRestaurantOwner,restaurants.create_restaurant);
  app.route('/restaurants/:restaurantId')
  .get(restaurants.get_restaurant)
  .put(verify.verifyRestaurantOwner, restaurants.update_restaurant)
  .delete(restaurants.delete_restaurant);
  app.get('/restaurants/getrestcode/:restaurantId', verify.verifyPersonnel, restaurants.get_qrcode); //Dis for checkin-code


  //USERS
  //(Customer/Restaurant personnel)
  var users = require('../controller/userController');
  app.route('/users')
  .post(users.create_user);
  app.route('/users/:userId')
  .get(users.get_user)
  .put(users.update_user)
  .delete(users.delete_user);

  app.get('/users/getsscode/:userId', verify.verifyCustomer, users.get_securecode); //Dis for GGD code
  //This is a code restaurant personnel can give to restaurant owner to link the two
  app.get('/users/getlinkcode/:userId', verify.verifyPersonnel, users.get_linkcode);
  // CHECK-INS, now needs general verification
  var checkins = require('../controller/checkinController');
  app.post('/users/checkin', verify.verifyCustomer, checkins.create_checkin);
  //checkout
  //to test, send post request as such: localhost:5000/checkout/1/
  app.post('/users/checkout/:checkinId', verify.verifyCustomer, checkins.checkout_checkin);



  //SUPER USER
  //(Sanitary services & Restaurant owners)

  var superusers = require('../controller/superuserController');
  app.route('/superusers/create').post(superusers.create_superuser);
  app.route('/superusers/login').post(superusers.login_superuser);
  // app.post('/superusers/markinfected', verify.verifySanitaryService, users.mark_user);
  app.post('/superusers/markinfected', users.mark_user);
  app.post('/superusers/linkpersonnel/:code/:restaurantId', verify.verifyRestaurantOwner, superusers.link_personnel);
  app.post('/superusers/logout/ro',verify.verifyRestaurantOwner, superusers.logout_ro);
  app.post('/superusers/logout/ss',verify.verifySanitaryService, superusers.logout_ss);
  app.post('/superusers/checkToken/ro', verify.verifyRestaurantOwner, (req,res) =>{
    res.status(200).send();
  });
  app.post('/superusers/checkToken/ss', verify.verifySanitaryService, (req,res) =>{
    res.status(200).send();
  });

  //// TODO: Add the front-end pages here?


};
