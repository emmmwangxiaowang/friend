import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export interface JwtPayload {
  userId: number;
  iat?: number;
  exp?: number;
}

export function verifyJwtToken(token: string, secret: string): JwtPayload {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (e) {
    throw new Error('Invalid JWT token');
  }
}

export async function getUserFromToken(token: string, secret: string) {
  const payload = verifyJwtToken(token, secret);
  
  const user = await prisma.user.findUnique({ where: { id: payload.userId } });
  if (!user) throw new Error('User not found');
  return user;
}
