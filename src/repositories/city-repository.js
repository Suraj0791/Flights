const CrudRepository = require('./crud-repository');
const { PrismaClient ,City} = require('@prisma/client');
const prisma = new PrismaClient();

class CityRepository extends CrudRepository {
    constructor() {
        super(City);
    }
}

module.exports = CityRepository;