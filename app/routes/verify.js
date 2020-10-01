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
    console.log("verifying.");
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

      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  },

  //verification for sanitary_services
  verifySanitaryService: function (req, res, next){
    console.log("verifying.");
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

      console.log('JWT is valid and payload is\n', payload);
      next();
    });
  }
};
