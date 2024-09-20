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
      console.log(error);
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

async function getAllCities() {
  try {
    const cities = await cityRepository.getAll();
    return cities;
  } catch(error) {
    throw new AppError('Cannot retrieve all cities', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function getCityById(id){
  try {
    const city = await cityRepository.getById(id);
    if(!city){
        throw new AppError('City not found', StatusCodes.NOT_FOUND);
    }
    return city;
  } catch(error) {
    throw new AppError('Cannot retrieve city by id', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(id, data){
  try {
    const city = await cityRepository.update(id, data);
    if(!city){
        throw new AppError('City not found', StatusCodes.NOT_FOUND);
    }
    return city;
  } catch(error) {
    throw new AppError('Cannot update city by id', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function deleteCity(id){
  try {
    const city = await cityRepository.delete(id);
    if(!city){
        throw new AppError('City not found', StatusCodes.NOT_FOUND);
    }
    return city;
  } catch(error) {
    throw new AppError('Cannot delete city by id', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports = {
    createCity,
    getAllCities,
    getCityById,
    updateCity,
    deleteCity
}

