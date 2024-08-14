import { TelegramClient } from "telegram";
import { StringSession } from "telegram/sessions";
import {PrismaClient} from "@prisma/client";

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

export async function getClient(telegram_id: string) {
    const prisma = new PrismaClient();
    const account = await prisma.telegram_account.findFirstOrThrow({
        where: {
            telegram_id: String(telegram_id)
        }
    });

    const apiId:number = Number(account.api_id);
    const apiHash = account.api_hash;
    const stringSession = new StringSession(account.session_string || "");

    if (!apiId) {
        console.error("Please fill in your API ID and Hash in the code.");
        return;
    }
    if (!apiHash) {
        console.error("Please fill in your API Hash and Hash in the code.");
        return;
    }
    if (!stringSession) {
        console.error("Please fill in your API ID and Hash in the code.");
        return;
    }

    const client = new TelegramClient(stringSession, apiId, apiHash, {
        connectionRetries: 5,
    });
    await client.connect();

    if (client.session.authKey) {
        return client;
    }
}