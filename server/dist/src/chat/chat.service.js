import { PrismaClient, ConversationType } from '@prisma/client';
const prisma = new PrismaClient();
export class ChatService {
    async getConversationsForUser(userId) {
        return prisma.user.findUnique({
            where: { id: userId },
            include: {
                conversations: {
                    include: {
                        conversation: true,
                    },
                },
            },
        });
    }
    async getMessagesForConversation(conversationId, limit = 20, offset = 0) {
        return prisma.message.findMany({
            where: { conversationId },
            orderBy: { createdAt: 'asc' },
            take: limit,
            skip: offset,
            include: { sender: true, conversation: true },
        });
    }
    async createGroup(name, creatorId, memberIds) {
        const group = await prisma.group.create({ data: { name } });
        const convo = await prisma.conversation.create({
            data: {
                type: ConversationType.GROUP,
                group: { connect: { id: group.id } },
            },
        });
        for (const uid of memberIds) {
            await prisma.userGroup.create({ data: { userId: uid, groupId: group.id } }).catch(() => { });
        }
        if (!memberIds.includes(creatorId)) {
            await prisma.userGroup.create({ data: { userId: creatorId, groupId: group.id } }).catch(() => { });
        }
        return { group, conversation: convo };
    }
    async getGroupInfo(groupId) {
        return prisma.group.findUnique({
            where: { id: groupId },
            include: { members: { include: { user: true } } },
        });
    }
    async addGroupMember(groupId, userId) {
        return prisma.userGroup.create({ data: { groupId, userId } });
    }
    async removeGroupMember(groupId, userId) {
        return prisma.userGroup.delete({ where: { userId_groupId: { userId, groupId } } });
    }
    async getGroupsForUser(userId) {
        return prisma.userGroup.findMany({
            where: { userId },
            include: { group: true },
        });
    }
}
export default new ChatService();
