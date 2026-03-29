import { Request, Response } from 'express';
import RecommendationService from '../services/recommendationService';

export default class RecommendationController {
  // Discovery feed for current user
  static async getDiscover(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    try {
      let recs = await RecommendationService.getCachedRecommendations(userId);
      if (!recs) {
        recs = await RecommendationService.refreshRecommendations(userId);
      }
      const aiHints = await RecommendationService.getAIHints(userId, recs);
      return res.json({ recommendations: recs, aiHints });
    } catch (err) {
      return res.status(500).json({ error: 'Internal error' });
    }
  }

  // Like action (swipe right)
  static async like(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    const targetId = req.params.userId as string;
    if (!userId || !targetId) return res.status(400).json({ error: 'Bad request' });
    try {
      const result = await RecommendationService.likeUser(userId, targetId);
      return res.json({ success: true, matched: result.matched });
    } catch {
      return res.status(500).json({ error: 'Internal' });
    }
  }

  // Pass action (swipe left)
  static async pass(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    const targetId = req.params.userId as string;
    if (!userId || !targetId) return res.status(400).json({ error: 'Bad request' });
    try {
      await RecommendationService.passUser(userId, targetId);
      return res.json({ success: true });
    } catch {
      return res.status(500).json({ error: 'Internal' });
    }
  }

  // Retrieve mutual matches
  static async getMatches(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const matches = await RecommendationService.getMatches(userId);
      return res.json({ matches });
    } catch {
      return res.status(500).json({ error: 'Internal' });
    }
  }

  // Force recomputation of recommendations
  static async refresh(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });
    try {
      const recs = await RecommendationService.refreshRecommendations(userId);
      return res.json({ refreshed: true, recommendations: recs });
    } catch {
      return res.status(500).json({ error: 'Internal' });
    }
  }
}
