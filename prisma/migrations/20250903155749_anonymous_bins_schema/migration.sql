-- CreateTable
CREATE TABLE "public"."AnonymousBin" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "code" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "passwordHash" TEXT,
    "customUrl" TEXT,
    "burnAfterReading" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnonymousBin_pkey" PRIMARY KEY ("id")
);
