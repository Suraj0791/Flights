/*
  Warnings:

  - You are about to drop the `Airplane` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('BUSINESS', 'ECONOMY', 'PREMIUM_ECONOMY', 'FIRST_CLASS');

-- DropTable
DROP TABLE "Airplane";

-- CreateTable
CREATE TABLE "Cities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airports" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "cityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Airplanes" (
    "id" SERIAL NOT NULL,
    "modelnumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airplanes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flights" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "departureAirportId" TEXT NOT NULL,
    "arrivalAirportId" TEXT NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "boardingGate" TEXT,
    "totalSeats" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flights_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Seats" (
    "id" SERIAL NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "col" TEXT NOT NULL,
    "type" "SeatType" NOT NULL DEFAULT 'ECONOMY',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FlightToSeat" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Cities_name_key" ON "Cities"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_name_key" ON "Airports"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_code_key" ON "Airports"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Airports_address_key" ON "Airports"("address");

-- CreateIndex
CREATE UNIQUE INDEX "_FlightToSeat_AB_unique" ON "_FlightToSeat"("A", "B");

-- CreateIndex
CREATE INDEX "_FlightToSeat_B_index" ON "_FlightToSeat"("B");

-- AddForeignKey
ALTER TABLE "Airports" ADD CONSTRAINT "Airports_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplanes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airports"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flights" ADD CONSTRAINT "Flights_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES "Airports"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seats" ADD CONSTRAINT "Seats_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplanes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlightToSeat" ADD CONSTRAINT "_FlightToSeat_A_fkey" FOREIGN KEY ("A") REFERENCES "Flights"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FlightToSeat" ADD CONSTRAINT "_FlightToSeat_B_fkey" FOREIGN KEY ("B") REFERENCES "Seats"("id") ON DELETE CASCADE ON UPDATE CASCADE;
