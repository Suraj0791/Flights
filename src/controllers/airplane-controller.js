const{Airplaneservice}=require('../services');
const{StatusCodes}=require('http-status-codes');

async function createAirplane(req, res) {
    try {
        const data = req.body;
        const airplane = await Airplaneservice.createAirplane( data );
        return res
            .status(StatusCodes.CREATED)
            .json({
                success: true,
                message: 'Airplane created successfully',
                data: airplane
            });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: 'Error creating airplane',
            error: error.message
        });
    }
}


module.exports={
    createAirplane,
}
