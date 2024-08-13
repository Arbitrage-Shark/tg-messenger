/*
  Warnings:

  - Added the required column `users` to the `telegram_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "telegram_account" ADD COLUMN     "users" TEXT NOT NULL;
