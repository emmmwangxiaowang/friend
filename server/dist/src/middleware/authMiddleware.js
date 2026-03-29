import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
// Middleware to protect routes with the access token
export async function requireAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Missing access token' });
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        const user = await prisma.user.findUnique({ where: { id: payload.sub } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        // Attach user to request for downstream handlers
        req.user = user;
        next();
    }
    catch (err) {
        return res.status(403).json({ error: 'Forbidden' });
    }
}
