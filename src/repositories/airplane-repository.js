const { PrismaClient } = require('@prisma/client');

const CrudRepository = require('./crud-repository');

const prisma = new PrismaClient();
const Airplane=prisma.Airplane;

class AirplaneRepository extends CrudRepository {
    constructor() {
        super(Airplane);
    }
}

module.exports = AirplaneRepository;