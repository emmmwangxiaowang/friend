// Simple unique ID generator for in-memory stores
module.exports = {
  generateId(prefix = 'id') {
    const rand = Math.random().toString(36).slice(2, 9);
    const ts = Date.now().toString(36);
    return `${prefix}_${ts}_${rand}`;
  }
};
