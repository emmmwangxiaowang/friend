import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

function signAccessToken(userId: string) {
  return jwt.sign({ sub: userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: '15m',
  });
}

function signRefreshToken(userId: string) {
  // Use a distinct secret for refresh tokens
  return jwt.sign({ sub: userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '7d',
  });
}

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, name, password: hashed } });
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    // Persist refresh token for revocation capability
    await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });

    return res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    await prisma.refreshToken.create({ data: { token: refreshToken, userId: user.id, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
    return res.json({ accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

export async function refresh(req: Request, res: Response) {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(400).json({ error: 'Refresh token required' });
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as { sub: string };
    } catch {
      return res.status(403).json({ error: 'Invalid refresh token' });
    }
    const tokenRecord = await prisma.refreshToken.findFirst({ where: { token: refreshToken } });
    if (!tokenRecord) return res.status(403).json({ error: 'Refresh token revoked' });
    // Issue new tokens and rotate refresh token
    const userId = payload.sub;
    const newAccess = signAccessToken(userId);
    const newRefresh = signRefreshToken(userId);
    // Revoke old and store new
    await prisma.refreshToken.delete({ where: { id: tokenRecord.id } }).catch(() => undefined);
    await prisma.refreshToken.create({ data: { token: newRefresh, userId, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });
    const user = await prisma.user.findUnique({ where: { id: userId } });
    return res.json({ accessToken: newAccess, refreshToken: newRefresh, user: { id: user?.id, email: user?.email, name: user?.name, avatar: user?.avatar } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
