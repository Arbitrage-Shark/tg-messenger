import { type NextRequest } from 'next/server'
// import { hashedPassword } from '../../../../utils/hash'
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

// const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    const token = localStorage.getItem('token');
    if (!token) {
        return Response.json({ message: 'Вы не авторизованы' }, { status: 401 });
    }
    localStorage.removeItem('token');
}
