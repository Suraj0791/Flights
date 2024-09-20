const CrudRepository = require('./crud-repository');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Airport=prisma.airport;



class AirportRepository extends CrudRepository {
    constructor() {
        super(Airport);
    }
}

module.exports = AirportRepository;