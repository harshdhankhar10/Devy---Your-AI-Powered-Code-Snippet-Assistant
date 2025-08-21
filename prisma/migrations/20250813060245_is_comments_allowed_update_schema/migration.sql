-- CreateTable
CREATE TABLE "public"."creditHistory" (
    "id" TEXT NOT NULL,
    "actionType" TEXT NOT NULL,
    "creditUsed" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "creditHistory_id_key" ON "public"."creditHistory"("id");
