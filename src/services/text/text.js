// ============================================================
// Import modules
import { NotFound } from '../../httpErrors';

// ============================================================
// Functions
/**
 *
 * @param {Fetcher} client
 * @param {Text}    text   - Text to create
 * @param {Object}  [store]  - Storage parameters
 * @param {boolean} [store.refreshIndex]
 */
async function createText(
    client,
    text,
    store,
) {
    const fetchParams = {
        body: JSON.stringify({
            ...text,
            store,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    };

    try {
        const createdText = await client.PUT('/text', fetchParams);
        return createdText;
    } catch (err) {
        if (err instanceof NotFound) {
            return undefined;
        }

        throw err;
    }
}

/**
 *
 * @param {Fetcher} client
 */
async function deleteText(
    client,
    id,
) {
    await client.rawDELETE(`/text/${id}`);
}

/**
 *
 * @param {Fetcher} client
 */
async function getText(
    client,
    id,
) {
    try {
        const fetchedText = await client.GET(`/text/${id}`);
        return fetchedText;
    } catch (err) {
        if (err instanceof NotFound) {
            return undefined;
        }

        throw err;
    }
}

/**
 *
 * @param {Client} client
 * @public
 */
async function refreshIndex(client) {
    await client.POST(
        '/store/refreshIndex',
        undefined,
        { response: false },
    );
}

// ============================================================
// Exports
export {
    createText as create,
    deleteText as delete,
    getText as get,
    refreshIndex,
};
