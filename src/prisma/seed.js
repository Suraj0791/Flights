const { PrismaClient } = require('@prisma/client');
const { faker } = require('@faker-js/faker');  
//faker dummy data dega

const prisma = new PrismaClient();

async function main() {
    // Fetch airplane IDs from the database for linking with seats
    const airplanes = await prisma.airplane.findMany();

    // Iterate over each airplane and create seats for it
    for (let airplane of airplanes) {
        for (let row = 1; row <= 30; row++) {  // Adjust number of rows as per your need
            for (let col of ['A', 'B', 'C', 'D', 'E', 'F']) {  // Adjust seat columns as per need
                const seatType = faker.helpers.arrayElement(['ECONOMY', 'BUSINESS', 'FIRST_CLASS','PREMIUM_ECONOMY']);

                await prisma.seat.create({
                    data: {
                        airplaneId: airplane.id,
                        row: row,
                        col: col,
                        type: seatType,
                    },
                });
            }
        }
    }

    console.log("Seeding completed!");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
