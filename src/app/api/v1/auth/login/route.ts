import { type NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const prisma = new PrismaClient();

    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    try {
        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (!user) {

            return Response.json({ message: 'Пользователь не найден' }, { status: 404 });
        }

        const hash = bcrypt.compareSync(password, user.password_hash);
        if (!hash) {
            return Response.json({ message: 'Неверные учетные данные' }, { status: 401 });
        }

        const status = user.status;
        if (status !== 10) {
            return Response.json({ message: 'Ваш аккаунт заблокирован' }, { status: 403 });
        }

        const role = user.role;

        const token = jwt.sign(
            {username, role},
            'secret', // TODO move to env
            {expiresIn: '30d'}
        ) as string;

        cookies().set('token', token, {
            name: "token",
            value: token,
        });

        return Response.json({token: token}, {status: 200});

    } catch (e) {
        console.error(e);
        return Response.json({ message: 'Ошибка сервера' }, { status: 500 });
    }
}