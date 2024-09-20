const{AirplaneRepository}=require('../repositories/index')
const { PrismaClient } = require('@prisma/client');
const {StatusCodes} = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const prisma=new PrismaClient();



const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    
      try{
        const airplane= await airplaneRepository.create(data);
        return airplane;
      }
      catch(error) {
        throw new AppError('Cannot create a new Airplance object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllAirplanes(){
   try {
     const airplanes=await airplaneRepository.getAll();
     return airplanes;
   } catch (error) {
    throw new AppError('Cannot fetch data of airplane', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function getAirplaneById(id){
   try {
     const airplane=await airplaneRepository.get(id);
     return airplane;
   } catch (error) {
    throw new AppError('Cannot fetch data of airplane', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function updateAirplane(id,data){
   try {
     const airplane=await airplaneRepository.update(id,data);
     return airplane;
   } catch (error) {
    throw new AppError('Cannot update airplane', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}

async function deleteAirplane(id){
   try {
     const airplane=await airplaneRepository.delete(id);
     return airplane;
   } catch (error) {
    throw new AppError('Cannot delete airplane', StatusCodes.INTERNAL_SERVER_ERROR);
   }
}




module.exports={
    createAirplane,
    getAllAirplanes,
    getAirplaneById,
    updateAirplane,
    deleteAirplane
}
