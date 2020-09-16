const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const restaurants = require('../../Restaurants');


const idFilter = req => restaurant => restaurant.id === parseInt(req.params.id);

router.get('/', (req, res) => res.json(restaurants));

router.get('/:id', (req, res) => {
  const found = restaurants.some(idFilter(req));

  if(found){
    res.json(restaurants.filter(idFilter(req)));
  }else{
    res.status(400);
  }
});


// Create Restaurant
router.post('/', (req, res) => {
  console.log("A new request received at " + Date.now());
  const newRestaurant = {
    ...req.body,
    id: uuid.v4(),
  };

  console.log("No issues so far");
  if (!newRestaurant.name || !newRestaurant.location) {
    return res.status(400).json({ msg: 'Please include a name and location' });
  }

  restaurants.push(newRestaurant);
  res.status(200).json({msg: "OK"});
  // res.redirect('/');
});

module.exports = router;
