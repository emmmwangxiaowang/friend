import crypto from 'crypto';
import Redis from 'ioredis';
class OpenAIProvider {
    constructor() {
        this.name = 'openai';
    }
    async call(messages, _options) {
        const apiKey = process.env.OPENAI_API_KEY;
        if (!apiKey)
            throw new Error('OPENAI_API_KEY not configured');
        const body = {
            model: 'gpt-3.5-turbo',
            messages,
            temperature: _options?.temperature ?? 0.7,
        };
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(body),
        });
        if (!res.ok) {
            const text = await res.text();
            throw new Error(`OpenAI request failed: ${res.status} ${text}`);
        }
        const data = await res.json();
        return data?.choices?.[0]?.message?.content ?? '';
    }
}
export class AIService {
    constructor() {
        this.redis = null;
        this.providers = [];
        this.cbStates = {};
        this.rateLimitPerMinute = 10;
        this.rateWindow = [];
        this.costCents = 0;
        this.COST_PER_CALL = 0.50;
        try {
            const redisUrl = process.env.REDIS_URL;
            if (redisUrl)
                this.redis = new Redis(redisUrl);
        }
        catch {
            this.redis = null;
        }
        this.providers = [new OpenAIProvider()];
    }
    static getInstance() {
        if (!AIService.instance)
            AIService.instance = new AIService();
        return AIService.instance;
    }
    async enforceRateLimit() {
        const now = Date.now();
        this.rateWindow = this.rateWindow.filter((t) => now - t < 60000);
        if (this.rateWindow.length >= this.rateLimitPerMinute) {
            const wait = 60000 - (now - this.rateWindow[0]);
            await new Promise((r) => setTimeout(r, wait));
        }
        this.rateWindow.push(now);
    }
    getProvider() {
        return this.providers[0];
    }
    async callProviderSafe(messages) {
        const open = this.getProvider();
        const cb = this.cbStates[open.name] ?? { state: 'CLOSED', failureCount: 0 };
        if (cb.state === 'OPEN') {
            const since = Date.now() - (cb.openedAt ?? 0);
            if (since < 60000)
                throw new Error('AI service temporarily unavailable');
            cb.state = 'HALF';
            this.cbStates[open.name] = cb;
        }
        try {
            await this.enforceRateLimit();
            const content = await open.call(messages, { temperature: 0.7 });
            this.cbStates[open.name] = { state: 'CLOSED', failureCount: 0 };
            this.costCents += this.COST_PER_CALL;
            return content;
        }
        catch (err) {
            const newCb = this.cbStates[open.name] ?? { state: 'CLOSED', failureCount: 0 };
            newCb.failureCount += 1;
            if (newCb.failureCount >= 3) {
                newCb.state = 'OPEN';
                newCb.openedAt = Date.now();
            }
            else {
                newCb.state = 'HALF';
            }
            this.cbStates[open.name] = newCb;
            throw err;
        }
    }
    async getFromCacheOrFetch(key, ttlSeconds, fetcher) {
        if (this.redis) {
            try {
                const cached = await this.redis.get(key);
                if (cached) {
                    return JSON.parse(cached);
                }
            }
            catch {
            }
        }
        const value = await fetcher();
        if (this.redis) {
            try {
                await this.redis.set(key, JSON.stringify(value), 'EX', ttlSeconds);
            }
            catch {
            }
        }
        return value;
    }
    async recommend(userId, payload) {
        const cacheKey = `ai:recommend:${userId}:${this.hash(payload)}`;
        const ttl = 300;
        try {
            const result = await this.getFromCacheOrFetch(cacheKey, ttl, async () => {
                const system = 'You are an AI assistant for SoulMate. Analyze user profiles to enhance recommendations with clear rationales.';
                const userContent = JSON.stringify({ userId, payload });
                const messages = [
                    { role: 'system', content: system },
                    { role: 'user', content: `Provide AI-enhanced recommendations for the user. Payload: ${userContent}. Return JSON array with objects: { userId, name, compatibilityScore (0-100), reasons, suggestedInterests }.` },
                ];
                const content = await this.callProviderSafe(messages);
                try {
                    return JSON.parse(content);
                }
                catch {
                    return { recommendations: content };
                }
            });
            return result;
        }
        catch {
            return this.ruleBasedRecommend(payload);
        }
    }
    async analyzeProfile(profile) {
        const cacheKey = `ai:analyze:${this.hash(profile)}`;
        const ttl = 600;
        try {
            const result = await this.getFromCacheOrFetch(cacheKey, ttl, async () => {
                const system = 'You are SoulMate AI. Analyze profile and identify gaps or missing elements to improve compatibility.';
                const messages = [
                    { role: 'system', content: system },
                    { role: 'user', content: `Profile: ${JSON.stringify(profile)}. Provide a JSON with fields like gaps: string[], enhancements: string[].` },
                ];
                const content = await this.callProviderSafe(messages);
                try {
                    return JSON.parse(content);
                }
                catch {
                    return { gaps: [], enhancements: [] };
                }
            });
            return result;
        }
        catch {
            return this.ruleBasedAnalyze(profile);
        }
    }
    async matchReason(userId, matchedUserId) {
        const cacheKey = `ai:match-reason:${userId}:${matchedUserId}`;
        const ttl = 3600;
        try {
            const res = await this.getFromCacheOrFetch(cacheKey, ttl, async () => {
                const system = 'Explain why two users match well together in SoulMate.';
                const messages = [
                    { role: 'system', content: system },
                    { role: 'user', content: `User ${userId} and User ${matchedUserId} have complementary interests. Provide a concise, friendly explanation for their compatibility.` },
                ];
                const content = await this.callProviderSafe(messages);
                return content;
            });
            return res;
        }
        catch {
            return this.ruleBasedMatchReason(userId, matchedUserId);
        }
    }
    async chatSuggest(conversation) {
        const cacheKey = `ai:chat-suggest:${this.hash(conversation)}`;
        const ttl = 300;
        try {
            const result = await this.getFromCacheOrFetch(cacheKey, ttl, async () => {
                const system = 'You provide friendly, context-aware conversation starters for SoulMate.';
                const messages = [
                    { role: 'system', content: system },
                    { role: 'user', content: `Conversation context: ${JSON.stringify(conversation)}. Return an array of 5 concise starters.` },
                ];
                const content = await this.callProviderSafe(messages);
                try {
                    return JSON.parse(content);
                }
                catch {
                    return { starters: content };
                }
            });
            return result;
        }
        catch {
            return this.ruleBasedChatSuggest(conversation);
        }
    }
    hash(objOrStr) {
        const s = typeof objOrStr === 'string' ? objOrStr : JSON.stringify(objOrStr);
        return crypto.createHash('sha256').update(s).digest('hex');
    }
    ruleBasedRecommend(payload) {
        const interests = (payload?.profile?.interests ?? payload?.interests ?? []);
        const base = interests.length ? interests.slice(0, 3) : ['coffee', 'movies'];
        return {
            recommendations: [
                { userId: 'rb_1', name: 'Alex', compatibilityScore: 72, reasons: ['Similar vibe', `Shared interest: ${base[0]}`], suggestedInterests: base },
                { userId: 'rb_2', name: 'Sam', compatibilityScore: 65, reasons: ['Active lifestyle', `Shared interest: ${base[1] ?? base[0]}`], suggestedInterests: base },
            ],
        };
    }
    ruleBasedAnalyze(profile) {
        const gaps = [];
        if (!profile?.bio)
            gaps.push('Bio is missing or too short');
        if (!profile?.interests?.length)
            gaps.push('Interests not specified');
        return { gaps, enhancements: gaps.map((g) => `Suggestion: ${g}`) };
    }
    ruleBasedMatchReason(userId, matchedUserId) {
        return `Based on common interests, ${userId} and ${matchedUserId} are a good match. Recommend initiating a conversation about shared interests.`;
    }
    ruleBasedChatSuggest(conversation) {
        return {
            starters: [
                'Hey! I noticed we both enjoy hiking. What is your favorite trail?',
                'Hi there! If you could travel anywhere this year, where would you go?',
                'What small passions keep you energized on weekends?',
                'What’s a book or movie you recently enjoyed and why?',
                'If you could cook one dish perfectly, what would it be?'
            ],
        };
    }
}
export const aiSingleton = AIService.getInstance();
