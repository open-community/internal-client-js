"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIterator = findIterator;

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen.return !== "function") { this.return = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype.throw = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype.return = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

/**
 * @param {Fetcher} client
 * @returns {Text[]}
 */
function findIterator(_x) {
  return _findIterator.apply(this, arguments);
}

function _findIterator() {
  _findIterator = _wrapAsyncGenerator(function* (client, {
    author: {
      account: authorAccount,
      identity: authorIdentity
    } = {},
    content,
    context,
    creationDate: {
      max: creationDateMax,
      min: creationDateMin
    } = {},
    deletionDate: {
      max: deletionDateMax,
      min: deletionDateMin
    } = {},
    id,
    owner,
    pagination: {
      cache: initialCacheSize = 10,
      offset: paginationOffset,
      size: paginationSize = 10
    } = {},
    search,
    sort,
    store: {
      forceIndex = false
    } = {},
    title
  } = {}) {
    client.appendSearchParams('author.account.id', authorAccount);
    client.appendSearchParams('author.identity.id', authorIdentity);
    client.appendSearchParams('content', content);
    client.appendSearchParams('context.id', context);
    client.appendSearchParams('creation-date.max', creationDateMax);
    client.appendSearchParams('creation-date.min', creationDateMin);
    client.appendSearchParams('deletion-date.max', deletionDateMax);
    client.appendSearchParams('deletion-date.min', deletionDateMin);
    client.appendSearchParams('id', id);
    client.appendSearchParams('owner.id', owner);
    client.appendSearchParams('pagination.offset', paginationOffset);
    client.appendSearchParams('pagination.size', paginationSize);
    client.appendSearchParams('search', search);
    client.appendSearchParams('sort', sort);
    client.appendSearchParams('store.forceIndex', forceIndex);
    client.appendSearchParams('title', title);
    let cacheSize = initialCacheSize;
    const {
      list: cache,
      total
    } = yield _awaitAsyncGenerator(client.GET('/text'));
    const remaining = total - cache.length - paginationOffset;
    const fetchMore = remaining > 0;
    let cacheUpdatePromise;
    const nextQuantity = 10;

    while (true) {
      // Update cache
      if (cache.length < nextQuantity) {
        cacheUpdatePromise = updateCache(client, cache);
      } // If all results fetched and if last cache result, we stop the generator


      if (fetchMore && cache.length === 1) {
        return cache.shift();
      }

      const params = yield {
        list: cache.shift(),
        remaining,
        total
      };

      if (params && typeof params.size !== 'undefined') {
        client.setSearchParam('pagination.size', paginationSize);
      }

      if (params && typeof params.cache !== 'undefined') {
        cacheSize = params.cache;
      }
    }
  });
  return _findIterator.apply(this, arguments);
}

class Cache {
  constructor(client, size, total, firstItems) {
    this.client = client;
    this.size = size;
    this.total = total;
    this.data = [...firstItems];
  }

  async get(count) {}

}

async function updateCache(client, cache, size, total, fetched) {
  let remaining = total - fetched;

  while (cache.length < size && remaining > 0) {
    client.setSearchParam('pagination.offset', fetched); // eslint-disable-next-line no-await-in-loop

    const {
      list: newList
    } = await client.GET('/text');
    cache.concat(...newList);
    remaining -= newList.length;
  }
} // ============================================================
// Exports
//# sourceMappingURL=find.js.map
