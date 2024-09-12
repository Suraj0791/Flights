const{Airplanecontroller}=require('../../controllers')
const{ Airplanemiddleware}=require('../../middlewares')

const express = require('express');

const router = express.Router();

// /api/v1/airplanes POST
router.post('/',Airplanemiddleware.validateCreateRequest, Airplanecontroller.createAirplane);

// /api/v1/airplanes GET
router.get('/',Airplanecontroller.getAllAirplanes);

// /api/v1/airplanes/:id GET

router.get('/:id', Airplanecontroller.getAirplaneById);

// /api/v1/airplanes/:id PUT
router.put('/:id', Airplanecontroller.updateAirplane);

// /api/v1/airplanes/:id DELETE

router.delete('/:id', Airplanecontroller.deleteAirplane);




module.exports=router;