const express = require('express');

const { FlightController } = require('../../controllers');
const { Flightmiddleware } = require('../../middlewares');

const router = express.Router();

// /api/v1/flights POST
router.post('/', 
        Flightmiddleware.validateCreateRequest,
        FlightController.createFlight);

// /api/v1/flights?trips=MUM-DEL GET
router.get('/', 
        FlightController.getAllFlights);

// /api/v1/flights/:id GET
router.get('/:id', 
        FlightController.getFlight);
// /api/v1/flights/:id/seats PATCH
router.patch(
        '/:id/seats', 
        Flightmiddleware.validateUpdateSeatsRequest,
        FlightController.updateSeats
);
module.exports = router;