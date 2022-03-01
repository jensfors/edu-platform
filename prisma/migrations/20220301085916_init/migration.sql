-- CreateTable
CREATE TABLE "Todo" (
    "uid" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,

    CONSTRAINT "Todo_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "login" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
