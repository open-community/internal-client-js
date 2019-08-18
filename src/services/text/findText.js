// ============================================================
// Import modules
import { IteratorCache } from '../../helpers';

// ============================================================
// Functions

/**
 * @typedef {Object} FindResult.<T>
 * @property {Array.<T>} list - List of elements
 * @property {number} remaining - Remaining number of elements to return
 * @property {number} total - Total number of elements to expect in the list
 */

/**
 * @typedef {Object} FindParamsObject
 * @property {number} quantity   - Quantity of elements to return
 * @property {Object} cache      - Cache settings
 * @property {number} cache.size - Number of elements that should be cached
 * @property {Object} fetch      - Fetch settings
 * @property {Object} fetch.pagination - Fetch pagination settings
 * @property {number} fetch.pagination.size - Size of the fetch pagination
 */

/**
 * @param {Fetcher}    client
 * @param {number}     offset
 * @param {TextFilter} filters
 * @returns {Iterator.<FindResult.<Text>, FindParams>}
 */
async function* findText(
    client,
    {
        offset: paginationOffset,
        ...filters
    } = {},
    {
        cache: {
            size: initialCacheSize,
        } = {},
        fetch: {
            size: fetchSize = 10,
        } = {},
        quantity: initialQuantity = 10,
    } = {},
) {
    // Adding filters to the client search params
    prepareClient(client, filters);

    client.appendSearchParams('pagination.size', fetchSize);
    client.appendSearchParams('pagination.offset', paginationOffset);

    // Fetching initial data
    const { list, total } = await client.GET('/text');

    // Building the cache
    const cache = new IteratorCache(
        {
            callback: async (offset) => {
                client.setSearchParam('pagination.offset', paginationOffset + offset);

                const { list: returnList } = await client.GET('/text');
                return returnList;
            },
            size: Number.isInteger(initialCacheSize) ? initialCacheSize : 2 * fetchSize,
            initialData: list,
            total,
        },
    );

    let remaining = total - paginationOffset;
    let quantity = initialQuantity;

    while (true) {
        // eslint-disable-next-line no-await-in-loop
        const currentList = await cache.get(quantity);
        remaining -= list.length;

        const returnObject = {
            list: currentList,
            remaining,
            total,
        };

        if (remaining <= 0) {
            return returnObject;
        }

        const params = yield returnObject;

        if (typeof params === 'number') {
            quantity = params;
        }

        if (typeof params === 'object') {
            const {
                quantity: nextQuantity,
                cache: {
                    size: nextCacheSize,
                } = {},
                pagination: {
                    size: nextPaginationSize,
                } = {},
            } = params;

            // Setting quantity
            if (Number.isInteger(nextQuantity) && nextQuantity > 0) {
                quantity = nextQuantity;
            }

            // Pagination size
            if (Number.isInteger(nextPaginationSize) && nextPaginationSize > 0) {
                client.setSearchParam('pagination.size', fetchSize);
            }

            // Cache size. Note that since the cache will be filled, it is important that
            // the pagination size value has been updated before this step.
            if (Number.isInteger(nextCacheSize) && nextCacheSize > 0) {
                cache.setSize(nextCacheSize);
            }
        }
    }
}

/**
 *
 * @param {Client} client
 * @param {TextFilter} filters
 * @private
 */
function prepareClient(client, filters) {
    const {
        author: {
            account: authorAccount,
            identity: authorIdentity,
        } = {},
        content,
        context,
        creationDate: {
            max: creationDateMax,
            min: creationDateMin,
        } = {},
        deletionDate: {
            max: deletionDateMax,
            min: deletionDateMin,
        } = {},
        id,
        owner,
        search,
        title,
        sort,
    } = filters;

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
    client.appendSearchParams('search', search);
    client.appendSearchParams('sort', sort);
    client.appendSearchParams('title', title);
}

// ============================================================
// JsDoc

/**
 * @typedef {Object} TextFilter
 * @property {Object}   author
 * @property {ApiID}    author.account - ID of the authors accounts
 * @property {ApiID}    author.identity - ID of the author identity
 * @property {string[]} content
 * @property {ApiID[]}  context
 * @property {Object}   creationDate
 * @property {Date}     creationDate.min
 * @property {Date}     creationDate.max
 * @property {Object}   deletionDate
 * @property {Date}     deletionDate.max
 * @property {Date}     deletionDate.min
 * @property {ApiID[]}  id
 * @property {ApiID[]}  owner - ID of the owner accounts
 * @property {string[]} search
 * @property {string[]} title
 * @property {string}   sort
 */

// ============================================================
// Exports
export {
    findText,
    prepareClient,
};
