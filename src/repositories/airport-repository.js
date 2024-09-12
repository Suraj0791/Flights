const CrudRepository = require('./crud-repository');
const { PrismaClient ,Airport} = require('@prisma/client');

const prisma = new PrismaClient();



class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }
}

module.exports = AirportRepository;