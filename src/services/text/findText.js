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
 * @param {Fetcher} client
 * @returns {Iterator.<FindResult.<Text>, FindParams>}
 */
async function* findText(
    client,
    {
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
        pagination: {
            cache: initialCacheSize = 10,
            offset: paginationOffset,
            size: paginationSize = 10,
        } = {},
        quantity: initialQuantity = 10,
        search,
        sort,
        store: {
            forceIndex = false,
        } = {},
        title,
    } = {},
) {
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

    const { list, total } = await client.GET('/text');

    const cache = new CacheUpdate(
        client,
        initialCacheSize,
        total,
        list,
        paginationOffset,
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
                client.setSearchParam('pagination.size', paginationSize);
            }

            // Cache size. Note that since the cache will be filled, it is important that
            // the pagination size value has been updated before this step.
            if (Number.isInteger(nextCacheSize) && nextCacheSize > 0) {
                cache.setSize(nextCacheSize);
            }
        }
    }
}

class CacheUpdate {
    constructor(client, size, total, firstItems, offset) {
        this.client = client;
        this.size = size;
        this.total = total;
        this.data = [...firstItems];
        this.offset = firstItems.length + offset;
    }

    /**
     * Perform the actual cache fill.
     * When the cache target is reach, the onCacheTargetSize method will be executed (this is
     * usefull when the target is lower than the cache size)
     * @private
     */
    async fill() {
        // If a fill is already in progress, we do nothing
        if (this.cacheFillInProgress) {
            return;
        }

        this.cacheFillInProgress = true;

        while (
            (
                // Cache size or target not yet reach
                this.data.length < this.cacheTargetSize || this.data.length < this.size
            )
            && this.offset < this.total // There is no more data to fetch
        ) {
            this.client.setSearchParam('pagination.offset', this.offset);

            // eslint-disable-next-line no-await-in-loop
            const { list } = await this.client.GET('/text');
            this.data.concat(...list);

            // Updating the offset
            this.offset += list.length;

            // If cache target reach, we trigger the cache target function
            if (this.onCacheTargetReach && this.data.length >= this.cacheTargetSize) {
                this.onCacheTargetReach();
                this.onCacheTargetReach = undefined;
            }
        }

        this.cacheFillInProgress = false;
    }

    /**
     * Return the nexts elements of the cache.
     * @param {number} count - Number of elements to return
     * @public
     */
    async get(count = 10) {
        await this.load(count);

        // Removing elements from the cache
        const data = this.data.splice(0, count);

        // Filling the cache
        this.fill();

        return data;
    }

    /**
     * @param {Number} target - Cache target size
     * @private
     */
    async load(target) {
        this.cacheTargetSize = target;

        // If no cache update in progress, force the cache fill
        this.fill();

        await new Promise((resolve) => {
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
}

// ============================================================
// Exports
export {
    findText,
};
