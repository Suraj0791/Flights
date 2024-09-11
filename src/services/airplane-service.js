const{AirplaneRepository}=require('../repositories/index')
const { PrismaClient } = require('@prisma/client');

const prisma=new PrismaClient();



const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    if (!airplaneRepository || typeof airplaneRepository.create !== 'function') {
        throw new Error('airplaneRepository is not initialized or create method is missing');
      }
    
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data provided');
      }
    
      try{
        const airplane= await airplaneRepository.create(data);
        return airplane;
      }
      catch(error){
        throw new Error(error);
      }
}



module.exports={
    createAirplane
}
