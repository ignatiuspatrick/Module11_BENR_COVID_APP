//JWT
const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../../secret');

module.exports = {
  // verify token for general verification
  verifyGeneral: function (req, res, next){
    console.log("verifying.");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (!token) return res.status(401).send('Access denied. No token provided.')
      if (err) {
        return res.status(403).send(err);
      }

      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  },

  //verification for restaurant owners
  verifyRestaurantOwner: function (req, res, next){
    console.log("verifying restaurant owner.");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (!token) return res.status(401).send({error: 'Access denied. No token provided.'})
      if (err) {
        return res.status(403).send(err);
      }
      if(payload.type != 'restaurant_owner'){
        return res.status(401).send({error: 'Acces denied. Wrong user type.'})
      }
      req.body.id = payload.id
      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  },

  //verification for sanitary_services
  verifySanitaryService: function (req, res, next){
    console.log("verifying sanitary service.");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (!token) return res.status(401).send('Access denied. No token provided.')
      if (err) {
        return res.status(403).send(err);
      }
      if(payload.type != 'sanitary_service'){
        return res.status(403).send({error: 'Acces denied. Wrong user type.'})
      }
      req.body.id = payload.id
      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  },


  //verify that it is restaurant personnel
  verifyPersonnel: function (req, res, next){
    console.log("verifying personnel.");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (!token) return res.status(401).send('Access denied. No token provided.')
      if (err) {
        return res.status(403).send(err);
      }
      if(payload.type != 'personnel'){
        return res.status(403).send({error: 'Acces denied. Wrong user type.'})
      }

      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  },

  //verify that is a customer
   verifyCustomer: function (req, res, next){
    console.log("verifying customer.");
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, function (err, payload) {
      if (!token) return res.status(401).send('Access denied. No token provided.')
      if (err) {
        return res.status(403).send(err);
      }
      console.log(req.params.userId);
      // TODO: TEST
      //Check if userId matches if it was provided in the path.
      if(req.params.userId){
          if(req.params.userId != payload.userId){
            return res.status(403).send({error: 'Access denied. Incompatible userIds.'});
          }
      }

      //check if it was indeed a customer.
      if(payload.type != 'customer'){
        return res.status(403).send({error: 'Access denied. Wrong user type.'})
      }

      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  }

};
