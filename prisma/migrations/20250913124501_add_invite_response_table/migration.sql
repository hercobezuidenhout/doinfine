/*
  Warnings:

  - You are about to drop the `AcceptedInvite` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."InviteResponseType" AS ENUM ('ACCEPTED', 'DECLINED');

-- DropForeignKey
ALTER TABLE "public"."AcceptedInvite" DROP CONSTRAINT "AcceptedInvite_invitationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."AcceptedInvite" DROP CONSTRAINT "AcceptedInvite_userId_fkey";

-- DropTable
DROP TABLE "public"."AcceptedInvite";

-- CreateTable
CREATE TABLE "public"."InviteResponse" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responseType" "public"."InviteResponseType" NOT NULL,
    "invitationId" INTEGER NOT NULL,

    CONSTRAINT "InviteResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."InviteResponse" ADD CONSTRAINT "InviteResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."InviteResponse" ADD CONSTRAINT "InviteResponse_invitationId_fkey" FOREIGN KEY ("invitationId") REFERENCES "public"."Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
