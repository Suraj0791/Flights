/*
  Warnings:

  - The primary key for the `Airplane` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rows` on the `Airplane` table. All the data in the column will be lost.
  - You are about to drop the column `seatsPerRow` on the `Airplane` table. All the data in the column will be lost.
  - The `id` column on the `Airplane` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Airplane" DROP CONSTRAINT "Airplane_pkey",
DROP COLUMN "rows",
DROP COLUMN "seatsPerRow",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ALTER COLUMN "capacity" SET DEFAULT 0,
ADD CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id");
