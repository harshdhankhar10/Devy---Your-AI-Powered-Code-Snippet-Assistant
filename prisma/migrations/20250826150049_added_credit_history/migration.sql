/*
  Warnings:

  - Added the required column `userId` to the `creditHistory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `creditUsed` on the `creditHistory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."creditHistory" ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "creditUsed",
ADD COLUMN     "creditUsed" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."creditHistory" ADD CONSTRAINT "creditHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
