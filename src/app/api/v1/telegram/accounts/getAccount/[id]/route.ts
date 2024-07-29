import type { NextApiRequest, NextApiResponse } from 'next';
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    const username = request.headers.get('X-User-Username');
    return {
        status: 200,
        body: `Hello, ${username}!`
    };

}
