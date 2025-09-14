-- CreateTable
CREATE TABLE "DoinfineToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DoinfineToken_pkey" PRIMARY KEY ("id")
);
