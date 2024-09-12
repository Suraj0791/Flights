const { PrismaClient } = require('@prisma/client');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const{CityRepository}=require('../repositories')


const prisma=new PrismaClient();

const cityRepository=new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch(error) {
        if(error.name == 'PrismaClientValidationError' ) {
            if (error.errors) {
                let explanation = [];
                error.errors.forEach((err) => {
                  explanation.push(err.message);
                });
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
              } else {
                // Handle the case where error.errors is undefined
                throw new AppError('Unknown error', StatusCodes.BAD_REQUEST);
              }
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity
}

