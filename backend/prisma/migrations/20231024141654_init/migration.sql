/*
  Warnings:

  - The primary key for the `UsersRoles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersRoles` table. All the data in the column will be lost.
  - The primary key for the `UsersSkills` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UsersSkills` table. All the data in the column will be lost.
  - You are about to drop the column `specialtyId` on the `UsersSkills` table. All the data in the column will be lost.
  - Added the required column `skillId` to the `UsersSkills` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UsersSkills" DROP CONSTRAINT "UsersSkills_specialtyId_fkey";

-- AlterTable
ALTER TABLE "UsersRoles" DROP CONSTRAINT "UsersRoles_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UsersRoles_pkey" PRIMARY KEY ("userId", "roleId");

-- AlterTable
ALTER TABLE "UsersSkills" DROP CONSTRAINT "UsersSkills_pkey",
DROP COLUMN "id",
DROP COLUMN "specialtyId",
ADD COLUMN     "skillId" INTEGER NOT NULL,
ADD CONSTRAINT "UsersSkills_pkey" PRIMARY KEY ("userId", "skillId");

-- AddForeignKey
ALTER TABLE "UsersSkills" ADD CONSTRAINT "UsersSkills_skillId_fkey" FOREIGN KEY ("skillId") REFERENCES "Skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
