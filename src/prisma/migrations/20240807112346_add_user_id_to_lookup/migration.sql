/*
  Warnings:

  - Added the required column `userId` to the `PaidFine` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaidFine" ADD COLUMN     "userId" TEXT NOT NULL;