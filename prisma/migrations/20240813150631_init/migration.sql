/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password_hash" TEXT NOT NULL,
    "authKey" TEXT,
    "accessToken" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "telegram_accounts" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_authKey_key" ON "user"("authKey");

-- CreateIndex
CREATE UNIQUE INDEX "user_accessToken_key" ON "user"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_telegram_accounts_key" ON "user"("telegram_accounts");
