-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT,
    "password" TEXT NOT NULL,
    "authKey" TEXT,
    "accessToken" TEXT,
    "role" TEXT NOT NULL DEFAULT 'Admin',
    "telegram_accounts" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "telegram_account" (
    "id" SERIAL NOT NULL,
    "telegram_id" TEXT NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT NOT NULL,
    "session_string" TEXT,
    "api_id" TEXT NOT NULL,
    "api_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "telegram_account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_authKey_key" ON "user"("authKey");

-- CreateIndex
CREATE UNIQUE INDEX "user_accessToken_key" ON "user"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "user_telegram_accounts_key" ON "user"("telegram_accounts");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_account_telegram_id_key" ON "telegram_account"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_account_phone_key" ON "telegram_account"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_account_session_string_key" ON "telegram_account"("session_string");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_account_api_id_key" ON "telegram_account"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "telegram_account_api_hash_key" ON "telegram_account"("api_hash");
