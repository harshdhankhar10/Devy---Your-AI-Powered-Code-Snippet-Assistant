/*
  Warnings:

  - You are about to drop the column `folderId` on the `Snippet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Snippet" DROP CONSTRAINT "Snippet_folderId_fkey";

-- AlterTable
ALTER TABLE "public"."Snippet" DROP COLUMN "folderId";

-- CreateTable
CREATE TABLE "public"."FolderSnippet" (
    "id" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,
    "snippetId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "FolderSnippet_id_key" ON "public"."FolderSnippet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "FolderSnippet_folderId_snippetId_key" ON "public"."FolderSnippet"("folderId", "snippetId");

-- AddForeignKey
ALTER TABLE "public"."FolderSnippet" ADD CONSTRAINT "FolderSnippet_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "public"."Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FolderSnippet" ADD CONSTRAINT "FolderSnippet_snippetId_fkey" FOREIGN KEY ("snippetId") REFERENCES "public"."Snippet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
