/*
  Warnings:

  - You are about to drop the `Specialty` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersSpecialties` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UsersSpecialties" DROP CONSTRAINT "UsersSpecialties_specialtyId_fkey";

-- DropForeignKey
ALTER TABLE "UsersSpecialties" DROP CONSTRAINT "UsersSpecialties_userId_fkey";

-- DropTable
DROP TABLE "Specialty";

-- DropTable
DROP TABLE "UsersSpecialties";

-- CreateTable
CREATE TABLE "Skills" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersSkills" (
    "userId" INTEGER NOT NULL,
    "specialtyId" INTEGER NOT NULL,

    CONSTRAINT "UsersSkills_pkey" PRIMARY KEY ("userId","specialtyId")
);

-- AddForeignKey
ALTER TABLE "UsersSkills" ADD CONSTRAINT "UsersSkills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersSkills" ADD CONSTRAINT "UsersSkills_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
