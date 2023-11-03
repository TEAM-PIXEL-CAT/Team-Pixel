/*
  Warnings:

  - You are about to drop the column `from` on the `Reviews` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[projectId]` on the table `Reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `client` to the `Reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reviews" DROP COLUMN "from",
ADD COLUMN     "client" TEXT NOT NULL,
ADD COLUMN     "projectId" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Reviews_projectId_key" ON "Reviews"("projectId");

-- AddForeignKey
ALTER TABLE "Reviews" ADD CONSTRAINT "Reviews_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
