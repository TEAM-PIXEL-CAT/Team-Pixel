-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "password" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "refreshToken" TEXT NOT NULL DEFAULT '';
