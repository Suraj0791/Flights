-- CreateTable
CREATE TABLE "Airplane" (
    "id" TEXT NOT NULL,
    "modelnumber" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "seatsPerRow" INTEGER NOT NULL,
    "rows" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Airplane_pkey" PRIMARY KEY ("id")
);
