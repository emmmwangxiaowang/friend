import { Router } from 'express';
import {
  updateLocation,
  getNearby,
  filterUsersByCity,
  discoverSameCityOnly,
} from '../services/locationService';

const router = Router();

// Update user's current location
router.post('/location/update', async (req, res) => {
  try {
    const payload = req.body;
    if (!payload || !payload.userId || !payload.city || !payload.country) {
      return res.status(400).json({ error: 'Missing required fields: userId, city, country' });
    }
    await updateLocation(payload);
    res.json({ ok: true, message: 'Location updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

// Get nearby users within radius (default 50km)
router.get('/location/nearby', async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const radiusKm = req.query.radiusKm ? Number(req.query.radiusKm) : 50;
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
    const nearby = await getNearby(userId, radiusKm);
    res.json({ nearby });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch nearby users' });
  }
});

// Filter users by city
router.get('/users', async (req, res) => {
  try {
    const city = req.query.city as string | undefined;
    if (!city) {
      return res.status(400).json({ error: 'Missing city parameter' });
    }
    const results = await filterUsersByCity(city);
    res.json({ users: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to filter users' });
  }
});

// Discover same-city recommendations only when requested
router.get('/discover', async (req, res) => {
  try {
    const userId = Number(req.query.userId);
    const sameCity = req.query.sameCity === 'true';
    if (!userId) {
      return res.status(400).json({ error: 'Missing userId' });
    }
    const results = await discoverSameCityOnly(userId, sameCity);
    res.json({ discover: results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to run discovery' });
  }
});

export default router;
