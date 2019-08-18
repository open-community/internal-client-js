"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// ============================================================
// Class

/**
 * Cache system for async iterators.
 * The class will prefetch next results in order to fill the cache.
 */
class IteratorCache {
  /**
   * @param {function(offset):Promise.<Array>} callback    - Function to call to fetch new data
   * @param {number}                           total       - Total number of elements fetchable
   * @param {number}                           size        - Cache size.
   *                                                         Number of items to prefetch
   * @param {Array}                            initialData - Initial data already fetched
   */
  constructor({
    callback,
    total,
    size,
    initialData
  }) {
    this.callback = callback;
    this.size = size;
    this.total = total;
    this.data = [...initialData];
    this.offset = 0;
    this.fetchingInProgress = false;
  }
  /**
   * Perform the actual cache fill.
   * When the cache target is reach, the onCacheTargetSize method will be executed (this is
   * usefull when the target is lower than the cache size).
   * This function can be executed several times.
   * @private
   */


  async fill() {
    // If a fill is already in progress, we do nothing
    if (this.cacheFillInProgress) {
      return;
    }

    this.cacheFillInProgress = true;

    while (( // Cache size or target not yet reach
    this.data.length < this.cacheTargetSize || this.data.length < this.size) && this.offset < this.total // There is no more data to fetch
    ) {
      // eslint-disable-next-line no-await-in-loop
      const list = await this.callback(this.offset);
      this.data.concat(...list); // Updating the offset

      this.offset += list.length; // If cache target reach, we trigger the cache target function

      if (this.onCacheTargetReach && this.data.length >= this.cacheTargetSize) {
        this.onCacheTargetReach();
        this.onCacheTargetReach = undefined;
      }
    }

    this.cacheFillInProgress = false;
  }
  /**
   * Return the nexts elements of the cache.
   * This function CANNOT be executed in parallel: running this function two simultaneous
   * times will throw an exception.
   * @param {number} count - Number of elements to return
   * @public
   */


  async get(count = 10) {
    if (this.fetchingInProgress) {
      throw new Error('IteratorCache.get called twice');
    }

    this.fetchingInProgress = true;
    await this.load(count); // Removing elements from the cache

    const data = this.data.splice(0, count); // Filling the cache

    this.fill();
    this.fetchingInProgress = false;
    return data;
  }
  /**
   * @param {Number} target - Cache target size
   * @private
   */


  async load(target) {
    this.cacheTargetSize = target; // If no cache update in progress, force the cache fill

    this.fill();
    await new Promise(resolve => {
      this.onCacheTargetReach = resolve;
    });
    this.cacheTargetSize = undefined;
  }
  /**
   * Set the size of the cache.
   * This will force the cache to fill if necessary.
   * @param {Number} size - New size of the cache
   * @public
   */


  setSize(size) {
    this.size = size;
    this.fill();
  }

} // ============================================================
// Exports


var _default = IteratorCache;
exports.default = _default;
//# sourceMappingURL=IteratorCache.js.map
