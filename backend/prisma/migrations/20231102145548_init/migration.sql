-- CreateTable
CREATE TABLE "Reviews" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reviews_pkey" PRIMARY KEY ("id")
);
