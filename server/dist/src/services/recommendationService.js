import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
// Small, isolated Redis client wrapper with lazy init
class RedisWrapper {
    static async getClient() {
        if (this.client)
            return this.client;
        if (!this.initPromise) {
            this.initPromise = (async () => {
                try {
                    const client = createClient({ url: process.env.REDIS_URL || 'redis://localhost:6379' });
                    client.on('error', () => { });
                    await client.connect();
                    this.client = client;
                }
                catch {
                    this.client = null;
                }
            })();
        }
        await this.initPromise;
        return this.client;
    }
}
RedisWrapper.client = null;
RedisWrapper.initPromise = null;
export default class RecommendationService {
    // Calculation helpers
    static distanceKm(a, b) {
        if (!a || !b)
            return 0;
        const toRad = (x) => (x * Math.PI) / 180;
        const R = 6371; // km
        const dLat = toRad(b.lat - a.lat);
        const dLon = toRad(b.lon - a.lon);
        const lat1 = toRad(a.lat);
        const lat2 = toRad(b.lat);
        const sinDlat = Math.sin(dLat / 2);
        const sinDlon = Math.sin(dLon / 2);
        const h = sinDlat * sinDlat + Math.cos(lat1) * Math.cos(lat2) * sinDlon * sinDlon;
        const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
        return R * c;
    }
    static jaccard(a, b) {
        if (!a || !b || a.length === 0 || b.length === 0)
            return 0;
        const sa = new Set(a);
        const sb = new Set(b);
        let inter = 0;
        for (const x of sa)
            if (sb.has(x))
                inter++;
        const uni = new Set([...sa, ...sb]).size;
        if (uni === 0)
            return 0;
        return inter / uni;
    }
    static dot(a, b) {
        if (!a || !b || a.length === 0 || b.length === 0)
            return 0;
        const len = Math.min(a.length, b.length);
        let sum = 0;
        let a2 = 0, b2 = 0;
        for (let i = 0; i < len; i++) {
            const av = a[i] ?? 0;
            const bv = b[i] ?? 0;
            sum += av * bv;
            a2 += av * av;
            b2 += bv * bv;
        }
        const denom = Math.sqrt(a2) * Math.sqrt(b2) || 1;
        return sum / denom;
    }
    // Scoring components (each 0..1)
    static scoreInterests(a, b) {
        return this.jaccard(a, b);
    }
    static scoreTraits(a, b) {
        const d = this.dot(a, b);
        return d;
    }
    static scoreLocation(a, b) {
        if (!a || !b)
            return 0;
        const dist = this.distanceKm(a, b);
        const maxKm = 5000;
        const score = 1 - Math.min(1, dist / maxKm);
        return Math.max(0, Math.min(1, score));
    }
    static scoreSoulTest(a, b) {
        if (!a || !b)
            return 0;
        const aa = a.answers ?? [];
        const bb = b.answers ?? [];
        if (aa.length === 0 || bb.length === 0)
            return 0;
        const len = Math.min(aa.length, bb.length);
        let dotSum = 0;
        for (let i = 0; i < len; i++)
            dotSum += (aa[i] ?? 0) * (bb[i] ?? 0);
        const maxSum = Math.sqrt(aa.slice(0, len).reduce((s, v) => s + v * v, 0) * bb.slice(0, len).reduce((s, v) => s + v * v, 0)) || 1;
        return dotSum / maxSum;
    }
    // Core computation
    static async computeTotalFor(current, candidate) {
        const interests = this.scoreInterests(current.interests, candidate.interests);
        const traits = this.scoreTraits(current.traits, candidate.traits);
        const location = this.scoreLocation(current.location, candidate.location);
        const soul = this.scoreSoulTest(current.soulTest, candidate.soulTest);
        const total = interests * 0.4 + traits * 0.2 + location * 0.2 + soul * 0.2;
        return {
            total,
            details: { interests, traits, location, soul },
            id: candidate.id,
            candidate,
        };
    }
    // Public API
    static async get redisReady() {
        return !!(await RedisWrapper.getClient());
    }
    static async getCachedRecommendations(userId) {
        const client = await RedisWrapper.getClient();
        if (!client)
            return null;
        const key = `rec:${userId}`;
        try {
            const raw = await client.get(key);
            if (!raw)
                return null;
            return JSON.parse(raw);
        }
        catch {
            return null;
        }
    }
    static async cacheRecommendations(userId, recs) {
        const client = await RedisWrapper.getClient();
        if (!client)
            return;
        const key = `rec:${userId}`;
        try {
            await client.set(key, JSON.stringify(recs), { EX: this.REDIS_TTL_SEC });
        }
        catch {
            // ignore cache errors
        }
    }
    static async buildRecommendations(userId) {
        const currentRaw = await this.prisma.user.findUnique({ where: { id: userId } });
        const current = {
            id: currentRaw?.id,
            interests: currentRaw?.interests ?? [],
            traits: currentRaw?.traits ?? [],
            location: currentRaw?.location,
            soulTest: currentRaw?.soulTest,
        };
        const candidatesRaw = await this.prisma.user.findMany({ where: { id: { not: userId } } });
        const candidates = candidatesRaw.map((c) => ({
            id: c.id,
            interests: c.interests ?? [],
            traits: c.traits ?? [],
            location: c.location,
            soulTest: c.soulTest,
        }));
        const results = [];
        for (const cand of candidates) {
            const r = await this.computeTotalFor(current, cand);
            results.push({ id: r.id, total: r.total, details: r.details, candidate: r.candidate });
        }
        results.sort((a, b) => b.total - a.total);
        // Return a lightweight payload for caching and clients
        return results.map(r => ({ id: r.id, total: r.total, details: r.details }));
    }
    static async refreshRecommendations(userId) {
        const recs = await this.buildRecommendations(userId);
        await this.cacheRecommendations(userId, recs);
        // Log each decision for future AI training
        const current = await this.prisma.user.findUnique({ where: { id: userId } });
        for (const r of recs) {
            await this.logDecision(userId, r.id, r.total, r.details);
        }
        return recs;
    }
    static async logDecision(userId, candidateId, total, details) {
        const client = await RedisWrapper.getClient();
        if (!client)
            return;
        const entry = { ts: Date.now(), userId, candidateId, total, details };
        try {
            await client.rPush('rec:logs', JSON.stringify(entry));
        }
        catch {
            // ignore
        }
    }
    // AI hook (stub for future ML integration)
    static async getAIHints(userId, recs) {
        // Placeholder: future integration will enrich recommendations with AI-based hints
        return recs.map(r => ({ id: r.id, hint: null }));
    }
    // Action helpers
    static async likeUser(userId, targetId) {
        const client = await RedisWrapper.getClient(); // ensure Redis is connected (lazy)
        // Record the like
        try {
            await this.prisma.like.create({ data: { fromUserId: userId, toUserId: targetId } });
        }
        catch {
            // ignore duplicate like errors
        }
        // Check for reciprocal like to form a match
        try {
            const reciprocal = await this.prisma.like.findFirst({ where: { fromUserId: targetId, toUserId: userId } });
            if (reciprocal) {
                await this.prisma.match.create({ data: { userAId: userId, userBId: targetId } });
                return { matched: true };
            }
        }
        catch {
            // ignore
        }
        return { matched: false };
    }
    static async passUser(userId, targetId) {
        try {
            await this.prisma.pass.create({ data: { fromUserId: userId, toUserId: targetId } });
        }
        catch {
            // ignore
        }
    }
    static async getMatches(userId) {
        try {
            const matches = await this.prisma.match.findMany({ where: { OR: [{ userAId: userId }, { userBId: userId }] } });
            return matches;
        }
        catch {
            return [];
        }
    }
}
// Prisma client for DB operations
RecommendationService.prisma = new PrismaClient();
RecommendationService.REDIS_TTL_SEC = 3600; // 1 hour
