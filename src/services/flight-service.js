const { StatusCodes } = require('http-status-codes');
const { FlightRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data) {
    try {
        const flight = await flightRepository.create(data);
        return flight;
    } catch (error) {
        if (error.name === 'PrismaClientValidationError') {
            if (error.message) {
                const explanation = error.message.split('\n'); // Split error message into lines for clarity
                throw new AppError(explanation, StatusCodes.BAD_REQUEST);
            } else {
                throw new AppError('Unknown validation error', StatusCodes.BAD_REQUEST);
            }
        }
        throw new AppError('Cannot create a new Flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAllFlights(query) {
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";

    if (query.trips) {
        const [departureAirportId, arrivalAirportId] = query.trips.split('-');
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
        // TODO: add a check to ensure they are not the same
    }

    if (query.price) {
        const [minPrice, maxPrice] = query.price.split('-');
        customFilter.price = {
            gte: parseInt(minPrice),
            lte: maxPrice ? parseInt(maxPrice) : 20000
        };
    }

    if (query.travellers) {
        customFilter.totalSeats = {
            gte: parseInt(query.travellers)
        };
    }

    if (query.tripDate) {
        customFilter.departureTime = {
            gte: new Date(query.tripDate),
            lte: new Date(`${query.tripDate}${endingTripTime}`)
        };
    }

    if (query.sort) {
        const params = query.sort.split(',');
        sortFilter = params.map((param) => {
            const [field, order] = param.split('_');
            return { [field]: order === 'desc' ? 'desc' : 'asc' };
        });
    }

    try {
        const flights = await flightRepository.getAllFlights(customFilter, sortFilter);
        return flights;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot fetch data of all the flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getFlight(id) {
    try {
        const flight = await flightRepository.get(id);
        if (!flight) {
            throw new AppError('The flight you requested is not present', StatusCodes.NOT_FOUND);
        }
        return flight;
    } catch (error) {
        if (error.statusCode === StatusCodes.NOT_FOUND) {
            throw new AppError('The flight you requested is not present', error.statusCode);
        }
        throw new AppError('Cannot fetch data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateSeats(data) {
    try {
        const response = await flightRepository.updateRemainingSeats(data.flightId, data.seats, data.dec);
        return response;
    } catch (error) {
        console.log(error);
        throw new AppError('Cannot update data of the flight', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createFlight,
    getAllFlights,
    getFlight,
    updateSeats
};
