const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const restaurants = require('../../Restaurants');


const idFilter = req => restaurant => restaurant.id === parseInt(req.params.id);

router.get('/', (req, res) => res.json(restaurants));

//TO-DO: Make simple API that checks in user @ restaurant

module.exports = router;
