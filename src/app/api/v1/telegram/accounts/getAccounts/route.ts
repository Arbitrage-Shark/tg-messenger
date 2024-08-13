import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();

    const user = request.headers.get('X-User-Username');
    const role = request.headers.get('X-User-Role');

    const accounts = await prisma.telegram_account.findMany({});

    if (!accounts) {
        console.log('Accounts not found');
    }

    return Response.json(accounts, { status: 200 });
}
