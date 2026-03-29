import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { listSoulTests, getSoulTestWithQuestions, submitSoulTestAnswers, getSoulTestResult, computeMatchesForUser } from '../services/soulTestService';

const prisma = new PrismaClient();

// List available soul tests
export async function getSoulTests(req: Request, res: Response) {
  try {
    const tests = await listSoulTests();
    // Return minimal payload to avoid over-fetching
    const payload = tests.map((t: any) => ({ id: t.id, title: t.title, description: t.description }));
    res.json(payload);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch soul tests' });
  }
}

// Get a test with its questions
export async function getSoulTest(req: Request, res: Response) {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'Invalid test id' });
  try {
    const test = await getSoulTestWithQuestions(id);
    if (!test) return res.status(404).json({ error: 'Test not found' });
    res.json(test);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch test' });
  }
}

// Submit answers for a test
export async function submitSoulTest(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = (req as any).user;
  const userId = user?.id;
  const { answers } = req.body;
  if (!id || !userId) return res.status(400).json({ error: 'Invalid request' });
  if (!answers) return res.status(400).json({ error: 'Answers are required' });
  try {
    const result = await submitSoulTestAnswers(userId, id, answers);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit answers' });
  }
}

// Get user's result for a test
export async function getSoulTestUserResult(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = (req as any).user;
  const userId = user?.id;
  if (!id || !userId) return res.status(400).json({ error: 'Invalid request' });
  try {
    const result = await getSoulTestResult(userId, id);
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch result' });
  }
}

// Get matches for a test
export async function getSoulTestMatches(req: Request, res: Response) {
  const id = Number(req.params.id);
  const user = (req as any).user;
  const userId = user?.id;
  if (!id || !userId) return res.status(400).json({ error: 'Invalid request' });
  try {
    const matches = await computeMatchesForUser(userId, id);
    res.json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to compute matches' });
  }
}
