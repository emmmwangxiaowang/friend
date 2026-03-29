import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getSoulTests, getSoulTest, submitSoulTest, getSoulTestUserResult, getSoulTestMatches, } from '../controllers/soulTestController';
const router = express.Router();
// List tests
router.get('/soul-tests', getSoulTests);
// Get a test with questions
router.get('/soul-tests/:id', getSoulTest);
// Submit answers for a test
router.post('/soul-tests/:id/submit', requireAuth, submitSoulTest);
// Get user's result for a test
router.get('/soul-tests/:id/result', requireAuth, getSoulTestUserResult);
// Get matches for a test
router.get('/soul-tests/:id/matches', requireAuth, getSoulTestMatches);
export default router;
