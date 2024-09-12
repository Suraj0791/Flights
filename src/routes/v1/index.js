const express = require('express');


const airplaneRoutes = require('./airplane-routes');
const flightRoutes = require('./flight-routes');

const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');

const router = express.Router();


router.use('/airplanes', airplaneRoutes);

router.use('/flights', flightRoutes);

router.use('/cities', cityRoutes);

router.use('/airports', airportRoutes);





module.exports = router;