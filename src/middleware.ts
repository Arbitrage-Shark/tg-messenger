import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    const JWT_SECRET = new TextEncoder().encode('secret');

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        const { payload } = await jwtVerify(token, JWT_SECRET) as any;

        request.headers.set('X-User-Username', payload.username);
        request.headers.set('X-User-Role', payload.role);
    } catch (error) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/protected/', '/', '/api/', '/account/'],
};
