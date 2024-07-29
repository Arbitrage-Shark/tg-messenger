/*
  Warnings:

  - A unique constraint covering the columns `[users]` on the table `tg_accounts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tg_accounts" ADD COLUMN     "users" TEXT NOT NULL DEFAULT 'admin2';

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE TEXT,
ALTER COLUMN "role" SET DATA TYPE TEXT,
ALTER COLUMN "verification_token" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_users_key" ON "tg_accounts"("users");

-- AddForeignKey
ALTER TABLE "tg_accounts" ADD CONSTRAINT "tg_accounts_users_fkey" FOREIGN KEY ("users") REFERENCES "user"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
