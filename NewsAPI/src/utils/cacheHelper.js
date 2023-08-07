const NodeCache = require("node-cache");
const scheduleCache = require("node-schedule");

class cacheHelper {
  constructor(ttInSeconds = 3000) {
    this.cache = new NodeCache({ stdTTL: ttInSeconds });
  }

  scheduleCacheUpdate() {
    const updateCacheTimer = scheduleCache.scheduleJob();
  }

  get(key) {
    return this.cache.get(key);
  }

  set(key, value) {
    return this.cache.set(key, value);
  }

  has(key) {
    return this.cache.has(key);
  }

  del(key) {
    return this.cache.del(key);
  }
}

module.exports = cacheHelper;
