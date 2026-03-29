// Lightweight Redis cache wrapper (optional). If Redis isn't available, fall back to in-memory no-cache mode.
let client = null;

try {
  const { createClient } = require('redis');
  client = createClient();
  client.connect().catch(() => {
    // ignore connect errors; caching will be unavailable
    client = null;
  });
} catch (e) {
  client = null;
}

async function get(key) {
  if (!client) return null;
  try {
    const v = await client.get(key);
    if (!v) return null;
    return JSON.parse(v);
  } catch (e) {
    return null;
  }
}

async function set(key, value, ttlSeconds) {
  if (!client) return;
  try {
    await client.set(key, JSON.stringify(value));
    if (typeof ttlSeconds === 'number') {
      await client.expire(key, ttlSeconds);
    }
  } catch (e) {
    // ignore cache errors
  }
}

module.exports = {
  get,
  set,
};
