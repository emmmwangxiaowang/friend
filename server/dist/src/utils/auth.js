import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export function verifyJwtToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    }
    catch (e) {
        throw new Error('Invalid JWT token');
    }
}
export async function getUserFromToken(token, secret) {
    const payload = verifyJwtToken(token, secret);
    const user = await prisma.user.findUnique({ where: { id: payload.userId } });
    if (!user)
        throw new Error('User not found');
    return user;
}
