-- CreateTable
CREATE TABLE "audience" (
    "id" SERIAL NOT NULL,
    "code_id" INTEGER NOT NULL,
    "telegram_id" INTEGER NOT NULL,
    "wrote" VARCHAR(255) NOT NULL,
    "lead" VARCHAR(255) NOT NULL,
    "pixel" VARCHAR(255) NOT NULL,
    "campaign_id" INTEGER NOT NULL,
    "adset_id" INTEGER NOT NULL,
    "ad_id" INTEGER NOT NULL,
    "campaign_name" VARCHAR(255) NOT NULL,
    "adset_name" VARCHAR(255) NOT NULL,
    "ad_name" VARCHAR(255) NOT NULL,
    "placement" VARCHAR(255) NOT NULL,
    "site_source_name" VARCHAR(255) NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "audience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "buyers_spend" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "target_date" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "buyers_spend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "channel" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "channel_id" VARCHAR(255) NOT NULL,
    "account_id" INTEGER NOT NULL,
    "code_id" INTEGER NOT NULL,
    "tg_channel_id" VARCHAR(255) NOT NULL,
    "bot_token" VARCHAR(255) NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "code" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "code" VARCHAR(255) NOT NULL,
    "api_id" VARCHAR(255) NOT NULL,
    "api_hash" VARCHAR(255) NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "code_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposite" (
    "id" SERIAL NOT NULL,
    "deposite" INTEGER NOT NULL,
    "channel_id" VARCHAR(255) NOT NULL,
    "telegram_id" VARCHAR(255) NOT NULL,
    "payment_system" VARCHAR(255) NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "deposite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fb_pixel" (
    "id" SERIAL NOT NULL,
    "pixel" VARCHAR(255) NOT NULL,
    "proxy" VARCHAR(255),
    "api_key" VARCHAR(255) NOT NULL,
    "channel_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "fb_pixel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "appointment" VARCHAR(255) NOT NULL,

    CONSTRAINT "financial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "migration" (
    "version" VARCHAR(180) NOT NULL,
    "apply_time" INTEGER,

    CONSTRAINT "migration_pkey" PRIMARY KEY ("version")
);

-- CreateTable
CREATE TABLE "telegram_accounts" (
    "id" SERIAL NOT NULL,
    "telegram_id" INTEGER NOT NULL,
    "username" VARCHAR,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "session_string" TEXT,
    "last_online" DATE,
    "users" TEXT
);

-- CreateTable
CREATE TABLE "tg_accounts" (
    "id" SERIAL NOT NULL,
    "telegram_id" INTEGER NOT NULL,
    "username" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT NOT NULL,
    "session_string" TEXT,
    "api_id" TEXT NOT NULL,
    "api_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tg_accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "auth_key" VARCHAR(32) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "password_reset_token" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL DEFAULT 'mediabayer',
    "status" SMALLINT NOT NULL DEFAULT 10,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verification_token" VARCHAR(255),

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_telegram_id_key" ON "tg_accounts"("telegram_id");

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_phone_key" ON "tg_accounts"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_session_string_key" ON "tg_accounts"("session_string");

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_api_id_key" ON "tg_accounts"("api_id");

-- CreateIndex
CREATE UNIQUE INDEX "tg_accounts_api_hash_key" ON "tg_accounts"("api_hash");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_reset_token_key" ON "user"("password_reset_token");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
