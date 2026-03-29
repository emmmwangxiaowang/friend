import express from 'express'
import { aiSingleton } from '../services/ai'

const router = express.Router()

router.post('/api/ai/recommend', async (req, res) => {
  try {
    const { userId, payload } = req.body
    if (!userId) return res.status(400).json({ error: 'userId required' })
    const result = await aiSingleton.recommend(userId, payload ?? {})
    res.json({ success: true, data: result })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message ?? 'Internal error' })
  }
})

// POST /api/ai/analyze-profile - Analyze user profile for gaps
router.post('/api/ai/analyze-profile', async (req, res) => {
  try {
    const { profile } = req.body
    if (!profile) return res.status(400).json({ error: 'profile required' })
    const result = await aiSingleton.analyzeProfile(profile)
    res.json({ success: true, data: result })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message ?? 'Internal error' })
  }
})

router.get('/api/ai/match-reason/:userId', async (req, res) => {
  try {
    const userId = req.params.userId
    const matchedUserId = (req.query.matchedUserId as string) ?? ''
    if (!userId || !matchedUserId) return res.status(400).json({ error: 'userId and matchedUserId are required' })
    const result = await aiSingleton.matchReason(userId, matchedUserId)
    res.json({ success: true, data: result })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message ?? 'Internal error' })
  }
})

router.post('/api/ai/chat-suggest', async (req, res) => {
  try {
    const { conversation } = req.body
    const result = await aiSingleton.chatSuggest(conversation ?? {})
    res.json({ success: true, data: result })
  } catch (err: any) {
    res.status(500).json({ success: false, error: err?.message ?? 'Internal error' })
  }
})

export default router
