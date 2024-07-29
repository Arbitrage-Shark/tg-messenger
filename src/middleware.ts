import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import {Simulate} from "react-dom/test-utils";
import reset = Simulate.reset;

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const JWT_SECRET = new TextEncoder().encode('secret');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET) as any;

        const response = NextResponse.next();

        response.headers.set('X-User-Username', payload.username);
        response.headers.set('X-User-Role', payload.role);
        return response;
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/protected/', '/', '/api/', '/api/v1/account/', '/api/v1/telegram/', '/api/v1/telegram/accounts/', '/api/v1/telegram/accounts/getAccount/', '/api/v1/user/me',
    '/api/v1/user/me']
};
