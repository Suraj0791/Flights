const{Airplanecontroller}=require('../../controllers')

const express = require('express');

const router = express.Router();

// /api/v1/airplanes POST
router.post('/', Airplanecontroller.createAirplane);

module.exports=router;