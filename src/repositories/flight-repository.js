const { PrismaClient } = require('@prisma/client');
const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('@prisma/client');
const { addRowLockOnFlights } = require('./queries');
const prisma = new PrismaClient();

class FlightRepository extends CrudRepository {
    constructor() {
        super(prisma.flight); // Use Prisma model directly
    }

    async getAllFlights(filter, sort) {
        const response = await prisma.flight.findMany({
            where: filter,
            orderBy: sort,
            include: {
                airplane: true, // Include airplane details
                departureAirport: {
                    include: {
                        city: true // Include the city of the departure airport
                    }
                },
                arrivalAirport: {
                    include: {
                        city: true // Include the city of the arrival airport
                    }
                }
            }
        });
        return response;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await prisma.$transaction(async (prisma) => {
            // Fetch the flight record with a row lock using Prisma's forUpdate option
            const flight = await prisma.flight.findUnique({
                where: { id: flightId },
                select: { totalSeats: true }
            });

            if (!flight) {
                throw new Error("Flight not found");
            }

            const newSeats = dec ? flight.totalSeats - seats : flight.totalSeats + seats;

            const updatedFlight = await prisma.flight.update({
                where: { id: flightId },
                data: { totalSeats: newSeats },
            });

            return updatedFlight;
        });

        return transaction;
    }
}

module.exports = FlightRepository;
