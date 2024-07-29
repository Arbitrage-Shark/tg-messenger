import type { NextRequest } from "next/server";
import {PrismaClient} from "@prisma/client";

export async function POST(request: NextRequest) {
    const prisma = new PrismaClient();

    const user = request.headers.get('X-User-Username');
    const role = request.headers.get('X-User-Role');

    console.log(user);

    if (!user) {
        console.log('User not found'); // TODO FIX USERNAME HEADER NOT FOUND
    }

    const accounts = await prisma.tg_accounts.findMany({
        where: {
            users: user || "admin"
        }
    });

    if (!accounts) {
        console.log('Accounts not found');
    }

    return Response.json(accounts, { status: 200 });

}
