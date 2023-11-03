/*
  Warnings:

  - The primary key for the `UsersRoles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UsersSkills` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "UsersSkills" DROP CONSTRAINT "UsersSkills_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UsersSkills_pkey" PRIMARY KEY ("id");
