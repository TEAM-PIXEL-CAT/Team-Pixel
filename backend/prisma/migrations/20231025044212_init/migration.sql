/*
  Warnings:

  - You are about to drop the column `assignedAt` on the `UsersProjects` table. All the data in the column will be lost.
  - Added the required column `about` to the `Projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "about" TEXT NOT NULL,
ADD COLUMN     "content" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Skills" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "about" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "UsersProjects" DROP COLUMN "assignedAt";
