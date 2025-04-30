

class AuthCache {
  private static cache = new Map();
  private static TTL = 1000 * 60; // 1 minute TTL

  static set(requestId, user) {
    this.cache.set(requestId, {
      ...user,
      timestamp: Date.now(),
    });
  }

  static get(requestId){
    const cached = this.cache.get(requestId);
    if (!cached) return null;

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(requestId);
      return null;
    }

    return cached;
  }

  static clear(requestId) {
    this.cache.delete(requestId);
  }

  // Cleanup old entries periodically
  static cleanup() {
    const now = Date.now();
    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > this.TTL) {
        this.cache.delete(key);
      }
    }
  }
}

// Run cleanup every minute
setInterval(() => AuthCache.cleanup(), 60000);

export default AuthCache; 