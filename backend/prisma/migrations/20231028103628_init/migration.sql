-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false;
