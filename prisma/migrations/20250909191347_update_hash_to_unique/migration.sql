/*
  Warnings:

  - A unique constraint covering the columns `[hash]` on the table `Invitation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Invitation_hash_key" ON "public"."Invitation"("hash");
