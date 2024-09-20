const CrudRepository = require('./crud-repository');
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();
const City = prisma.city; // Using Prisma model directly

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;