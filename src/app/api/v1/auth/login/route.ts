import { type NextRequest } from 'next/server'
// import { hashedPassword } from '../../../../utils/hash'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const username = formData.get('username');
    const hashedPassword = hashPassword(<string>formData.get('password'));

    if (!username || !hashedPassword) {
        return Response.json({ message: 'Не все поля заполнены' }, { status: 400 });
    }

    if (username === 'admin' && hashedPassword === hashPassword('password')) {
        const token = jwt.sign(
            {username},
            'secret', // TODO move to env
            {expiresIn: '30d'}
        );

        return Response.json({ token }, { status: 200 });
    }

    return Response.json({ message: 'Неверные учетные данные' }, { status: 401 });
}

function hashPassword(password: string): string {
    return crypto.createHash('md5').update(password).digest('hex');
}
