import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
dotenv.config();
const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Auth routes
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const bcrypt = require('bcryptjs');
        const passwordHash = await bcrypt.hash(password, 10);
        const user = await prisma.$queryRawUnsafe(`INSERT INTO "User" (email, "passwordHash") VALUES ($1, $2) RETURNING id, email`, [email, passwordHash]);
        res.json({ message: 'User created', user });
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const bcrypt = require('bcryptjs');
        const jwt = require('jsonwebtoken');
        const users = await prisma.$queryRawUnsafe(`SELECT * FROM "User" WHERE email = $1`, [email]);
        if (!users || users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const user = users[0];
        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET || 'secret', { expiresIn: '15m' });
        const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', { expiresIn: '7d' });
        res.json({ token, refreshToken, user: { id: user.id, email: user.email } });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// User routes
app.get('/api/users', async (req, res) => {
    try {
        const users = await prisma.$queryRawUnsafe(`SELECT id, email, "createdAt" FROM "User"`);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await prisma.$queryRawUnsafe(`SELECT * FROM "Post" ORDER BY "createdAt" DESC`);
        res.json(posts);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/soul-tests', async (req, res) => {
    try {
        const tests = await prisma.$queryRawUnsafe(`SELECT * FROM "SoulTest"`);
        res.json(tests);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/api/interests', async (req, res) => {
    try {
        const interests = await prisma.$queryRawUnsafe(`SELECT * FROM "Interest"`);
        res.json(interests);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port, () => {
    console.log(`SoulMate server running on http://localhost:${port}`);
    console.log(`Health: http://localhost:${port}/api/health`);
});
export default app;
