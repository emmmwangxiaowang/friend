import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from './middleware/authMiddleware';

const prisma = new PrismaClient();

// Helper to sanitize user fields for response
function serializeUser(user: any) {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
    // Adjust fields based on schema availability
    interests: (user as any).interests ?? [],
    traits: (user as any).traits ?? [],
  };
}

export async function getMe(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  res.json(serializeUser(user));
}

export async function updateMe(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const { name, avatar } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name ?? user.name,
        avatar: avatar ?? user.avatar,
      },
    });
    res.json(serializeUser(updated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
}

export async function addInterests(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Interest name required' });
  try {
    // Ensure the Interest exists, then connect to user via relation
    const [interest] = await prisma.$transaction([
      prisma.interest.upsert({ where: { name }, create: { name }, update: {} }),
    ]);
    // Connect to user (join table)
    await prisma.userInterest.create({ data: { userId: user.id, interestId: interest.id } });
    const updated = await prisma.user.findUnique({ where: { id: user.id }, include: { interests: true, traits: true } });
    res.json(serializeUser(updated as any));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add interest' });
  }
}

export async function removeInterests(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.params as any;
  try {
    await prisma.userInterest.delete({ where: { userId_interestId: { userId: user.id, interestId: id } } });
    const updated = await prisma.user.findUnique({ where: { id: user.id }, include: { interests: true, traits: true } });
    res.json(serializeUser(updated as any));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove interest' });
  }
}

export async function addTraits(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Trait name required' });
  try {
    const [trait] = await prisma.$transaction([
      prisma.trait.upsert({ where: { name }, create: { name }, update: {} }),
    ]);
    await prisma.userTrait.create({ data: { userId: user.id, traitId: trait.id } });
    const updated = await prisma.user.findUnique({ where: { id: user.id }, include: { interests: true, traits: true } });
    res.json(serializeUser(updated as any));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add trait' });
  }
}

export async function removeTraits(req: Request, res: Response) {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: 'Unauthorized' });
  const { id } = req.params as any;
  try {
    await prisma.userTrait.delete({ where: { userId_traitId: { userId: user.id, traitId: id } } });
    const updated = await prisma.user.findUnique({ where: { id: user.id }, include: { interests: true, traits: true } });
    res.json(serializeUser(updated as any));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove trait' });
  }
}
