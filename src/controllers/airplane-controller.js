const{Airplaneservice}=require('../services');
const{StatusCodes}=require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createAirplane(req, res) {
    try {
        const data = req.body;
        const airplane = await Airplaneservice.createAirplane( data );
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAirplaneById(req,res){
    try {
        const id = parseInt(req.params.id);
        const airplane = await Airplaneservice.getAirplaneById( id );
        SuccessResponse.data = airplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function getAllAirplanes(req,res){
    try {
        const airplanes = await Airplaneservice.getAllAirplanes();
        SuccessResponse.data = airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateAirplane(req,res){
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const updatedAirplane = await Airplaneservice.updateAirplane( id, data );
        SuccessResponse.data = updatedAirplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function deleteAirplane(req,res){
    try {
        const id = parseInt(req.params.id);
        await Airplaneservice.deleteAirplane( id );
        SuccessResponse.message = 'Airplane deleted successfully';
        return res
                .status(StatusCodes.NO_CONTENT)
                .json(SuccessResponse);
    } catch(error) {
        ErrorResponse.error = error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}





module.exports={
    createAirplane,
    getAirplaneById,
    getAllAirplanes,
    updateAirplane,
    deleteAirplane,
}
