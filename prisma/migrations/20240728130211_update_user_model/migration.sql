/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `password_reset_token` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth_key]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "user_email_key";

-- DropIndex
DROP INDEX "user_password_reset_token_key";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "email",
DROP COLUMN "password_reset_token",
ALTER COLUMN "auth_key" SET DATA TYPE TEXT,
ALTER COLUMN "password_hash" SET DATA TYPE TEXT,
ALTER COLUMN "status" SET DATA TYPE INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "user_auth_key_key" ON "user"("auth_key");
