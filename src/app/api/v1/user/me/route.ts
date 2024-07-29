import type {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const user = request.headers.get('X-User-Username');
    const role = request.headers.get('X-User-Role');

    if (!user) {
        request.headers.delete('token');
        return Response.json({error: 'User not found'}, {status: 404});
    }

    return Response.json({ username: user, role: role }, { status: 200 });
}
