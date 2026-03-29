const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcrypt = require('bcryptjs');
    const passwordHash = await bcrypt.hash(password, 10);
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const user = await prisma.$queryRawUnsafe(
      `INSERT INTO "User" (email, "passwordHash") VALUES ($1, $2) RETURNING id, email`,
      [email, passwordHash]
    );
    await prisma.$disconnect();
    res.json({ message: 'User created', user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    
    const users = await prisma.$queryRawUnsafe(
      `SELECT * FROM "User" WHERE email = $1`,
      [email]
    );
    
    if (!users || users.length === 0) {
      await prisma.$disconnect();
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    const valid = await bcrypt.compare(password, user.passwordHash);
    
    if (!valid) {
      await prisma.$disconnect();
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user.id }, process.env.JWT_ACCESS_SECRET || 'secret', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET || 'refresh-secret', { expiresIn: '7d' });
    
    await prisma.$disconnect();
    res.json({ token, refreshToken, user: { id: user.id, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const users = await prisma.$queryRawUnsafe(`SELECT id, email, "createdAt" FROM "User"`);
    await prisma.$disconnect();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const posts = await prisma.$queryRawUnsafe(`SELECT * FROM "Post" ORDER BY "createdAt" DESC`);
    await prisma.$disconnect();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/soul-tests', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const tests = await prisma.$queryRawUnsafe(`SELECT * FROM "SoulTest"`);
    await prisma.$disconnect();
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/interests', async (req, res) => {
  try {
    const { PrismaClient } = require('@prisma/client');
    const prisma = new PrismaClient();
    const interests = await prisma.$queryRawUnsafe(`SELECT * FROM "Interest"`);
    await prisma.$disconnect();
    res.json(interests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`SoulMate server running on http://localhost:${port}`);
  console.log(`Health: http://localhost:${port}/api/health`);
});

module.exports = app;
