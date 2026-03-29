import { Server as SocketIOServer } from 'socket.io';
import { createClient as createRedisClient } from 'redis';
import { createAdapter } from '@socket.io/redis-adapter';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
let io;
export async function initializeWebsocket(httpServer) {
    io = new SocketIOServer(httpServer, {
        cors: { origin: '*', methods: ['GET', 'POST'] },
    });
    // Redis pub/sub for socket.io adapter (scaling ready)
    const pubClient = createRedisClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
    const subClient = pubClient.duplicate();
    // Start and attach adapter (fire-and-forget to keep startup simple)
    void Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
        io.adapter(createAdapter(pubClient, subClient));
    }).catch(() => { });
    // JWT-based auth for socket connections
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (!token)
            return next(new Error('Authentication error'));
        try {
            const payload = jwt.verify(token, JWT_SECRET);
            socket.userId = payload.userId;
            return next();
        }
        catch {
            return next(new Error('Authentication error'));
        }
    });
    const prisma = new PrismaClient();
    // Simple online presence via Redis and presence broadcasts
    io.on('connection', async (socket) => {
        const userId = socket.userId;
        // mark user online
        try {
            await (pubClient.get ? pubClient.set(`online:${userId}`, '1') : null);
        }
        catch { }
        socket.join(`user_${userId}`);
        io.emit('presence', { userId, online: true });
        socket.emit('connected', { userId });
        // Join rooms for conversations or groups
        socket.on('join', async (payload) => {
            const { conversationId, groupId } = payload || {};
            if (conversationId)
                socket.join(`conversation_${conversationId}`);
            if (groupId)
                socket.join(`group_${groupId}`);
        });
        socket.on('leave', async (payload) => {
            const { conversationId, groupId } = payload || {};
            if (conversationId)
                socket.leave(`conversation_${conversationId}`);
            if (groupId)
                socket.leave(`group_${groupId}`);
        });
        // Private message: persist and broadcast
        socket.on('message', async (payload) => {
            const toUserId = payload?.toUserId;
            const content = payload?.content;
            let conversationId = payload?.conversationId;
            // If no conversationId provided, create a PRIVATE conversation and link both users
            if (!conversationId && toUserId) {
                const conv = await prisma.conversation.create({ data: { type: 'PRIVATE' } });
                await prisma.userConversation.create({ data: { conversationId: conv.id, userId } });
                await prisma.userConversation.create({ data: { conversationId: conv.id, userId: toUserId } });
                conversationId = conv.id;
            }
            const msg = await prisma.message.create({ data: { conversationId, senderId: userId, content } });
            if (toUserId) {
                io.to(`user_${toUserId}`).emit('message', { conversationId, message: msg });
            }
            io.to(`user_${userId}`).emit('message', { conversationId, message: msg });
        });
        // Group message: persist and broadcast to group room
        socket.on('groupMessage', async (payload) => {
            const groupId = payload?.groupId;
            const content = payload?.content;
            const conv = await prisma.conversation.create({ data: { type: 'GROUP', group: { connect: { id: groupId } } } });
            const msg = await prisma.message.create({ data: { conversationId: conv.id, senderId: userId, content } });
            io.to(`group_${groupId}`).emit('groupMessage', { conversationId: conv.id, message: msg, groupId });
        });
        // Typing indicators
        socket.on('typing', (payload) => {
            const conversationId = payload?.conversationId;
            const isTyping = payload?.isTyping;
            if (conversationId)
                io.to(`conversation_${conversationId}`).emit('typing', { userId, isTyping });
        });
        // Read receipts
        socket.on('read', (payload) => {
            const conversationId = payload?.conversationId;
            if (conversationId)
                io.to(`conversation_${conversationId}`).emit('read', { userId, conversationId });
        });
        // Cleanup on disconnect
        socket.on('disconnect', async () => {
            try {
                await pubClient.del(`online:${userId}`);
            }
            catch { }
            io.emit('presence', { userId, online: false });
        });
    });
}
