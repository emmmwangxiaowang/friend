import { Request, Response } from 'express';
import RecommendationService from '../services/recommendationService';

/**
 * 推荐控制器
 * 处理用户发现、点赞、打招呼、匹配等推荐相关功能
 */
export default class RecommendationController {
  /** 获取发现页推荐用户列表 */
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

  /** 点赞操作 - 表示对用户感兴趣 */
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

  /** 跳过操作 - 不感兴趣 */
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

  /**
   * 打招呼操作
   * - 记录用户打招呼行为
   * - 可用于后续推荐算法的商业因子
   */
  static async greet(req: Request, res: Response) {
    const userId = (req as any).user?.id as string | undefined;
    const targetId = req.params.userId as string;
    if (!userId || !targetId) return res.status(400).json({ error: 'Bad request' });
    try {
      await RecommendationService.greetUser(userId, targetId);
      return res.json({ success: true, message: '打招呼成功' });
    } catch {
      return res.status(500).json({ error: 'Internal' });
    }
  }

  /** 获取互相匹配的用户列表 */
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

  /** 强制刷新推荐列表 */
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
