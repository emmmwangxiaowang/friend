import { Router } from 'express';
import RecommendationController from '../controllers/recommendationController';
// Simple auth middleware placeholder: requires req.user.id
function ensureAuth(req, res, next) {
    if (req.user?.id)
        return next();
    return res.status(401).json({ error: 'Unauthorized' });
}
const router = Router();
router.get('/api/discover', ensureAuth, RecommendationController.getDiscover);
router.post('/api/actions/like/:userId', ensureAuth, RecommendationController.like);
router.post('/api/actions/pass/:userId', ensureAuth, RecommendationController.pass);
router.get('/api/matches', ensureAuth, RecommendationController.getMatches);
router.post('/api/recommendations/refresh', ensureAuth, RecommendationController.refresh);
export default router;
