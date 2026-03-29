import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import ChatService from './chat.service';
const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });
    try {
        const payload = jwt.verify(token, JWT_SECRET);
        req.userId = payload.userId;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
router.get('/conversations', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const data = await ChatService.getConversationsForUser(userId);
    res.json(data);
});
// GET /api/conversations/:id/messages - Get message history
router.get('/conversations/:id/messages', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 20;
    const offset = parseInt(req.query.offset) || 0;
    const msgs = await ChatService.getMessagesForConversation(id, limit, offset);
    res.json(msgs);
});
router.post('/groups', authMiddleware, async (req, res) => {
    const { name, memberIds } = req.body;
    const creatorId = req.userId;
    const result = await ChatService.createGroup(name, creatorId, memberIds ?? []);
    res.json(result);
});
router.get('/groups/:id', authMiddleware, async (req, res) => {
    const id = parseInt(req.params.id);
    const data = await ChatService.getGroupInfo(id);
    res.json(data);
});
router.post('/groups/:id/members', authMiddleware, async (req, res) => {
    const groupId = parseInt(req.params.id);
    const { userId } = req.body;
    const result = await ChatService.addGroupMember(groupId, userId);
    res.json(result);
});
router.delete('/groups/:id/members/:userId', authMiddleware, async (req, res) => {
    const groupId = parseInt(req.params.id);
    const userId = parseInt(req.params.userId);
    const result = await ChatService.removeGroupMember(groupId, userId);
    res.json(result);
});
router.get('/groups', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const groups = await ChatService.getGroupsForUser(userId);
    res.json(groups);
});
export default router;
