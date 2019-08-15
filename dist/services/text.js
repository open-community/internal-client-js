"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = createText;
exports.delete = deleteText;
exports.find = findText;
exports.get = getText;
exports.refreshIndex = refreshIndex;

var _httpErrors = require("../httpErrors");

// ============================================================
// Import modules
// ============================================================
// Functions

/**
 *
 * @param {Fetcher} client
 * @param {Text}    text   - Text to create
 * @param {Object}  [store]  - Storage parameters
 * @param {boolean} [store.refreshIndex]
 */
async function createText(client, text, store) {
  const fetchParams = {
    body: JSON.stringify({ ...text,
      store
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8'
    }
  };

  try {
    const createdText = await client.PUT('/text', fetchParams);
    return createdText;
  } catch (err) {
    if (err instanceof _httpErrors.NotFound) {
      return undefined;
    }

    throw err;
  }
}
/**
 *
 * @param {Fetcher} client
 */


async function deleteText(client, id) {
  await client.rawDELETE(`/text/${id}`);
}
/**
 *
 * @param {Fetcher} client
 */


async function getText(client, id) {
  try {
    const fetchedText = await client.GET(`/text/${id}`);
    return fetchedText;
  } catch (err) {
    if (err instanceof _httpErrors.NotFound) {
      return undefined;
    }

    throw err;
  }
}
/**
 * @param {Fetcher} client
 * @returns {Text[]}
 */


async function findText(client, {
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
    offset: paginationOffset,
    size: paginationSize
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
  const listTexts = await client.GET('/text');
  return listTexts;
}
/**
 *
 * @param {Client} client
 * @public
 */


async function refreshIndex(client) {
  await client.POST('/store/refreshIndex', undefined, {
    response: false
  });
} // ============================================================
// Exports
//# sourceMappingURL=text.js.map
