/*
  Warnings:

  - You are about to drop the `CreditPackage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CreditPackage" DROP CONSTRAINT "CreditPackage_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Payment" DROP CONSTRAINT "Payment_packageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- DropTable
DROP TABLE "public"."CreditPackage";

-- DropTable
DROP TABLE "public"."Transaction";

-- DropEnum
DROP TYPE "public"."TransactionType";
