import Error404 from '../httpErrors/Error404';

// ============================================================
// Functions
/**
 *
 * @param {Fetcher} client
 */
async function createText(
    client,
    {
        text,
    },
) {
    const fetchParams = {
        body: text,
    };

    try {
        const createdText = await client.POST('/text', fetchParams);
        return createdText;
    } catch (err) {
        if (err instanceof Error404) {
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
    {
        id,
    },
) {
    await client.DELETE(`/text/${id}`);
}

/**
 *
 * @param {Fetcher} client
 */
async function getText(
    client,
    {
        id,
    },
) {
    const createdText = await client.GET(`/text/${id}`);

    return createdText;
}

/**
 * @param {Fetcher} client
 * @returns {Text[]}
 */
async function findText(
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
        },
        deletionDate: {
            max: deletionDateMax,
            min: deletionDateMin,
        },
        id,
        owner,
        pagination: {
            offset: paginationOffset,
            size: paginationSize,
        },
        search,
        sort,
        title,
    },
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
    client.appendSearchParams('title', title);

    const listTexts = await client.GET('/text');

    return listTexts;
}

// ============================================================
// Exports
export {
    createText as create,
    deleteText as delete,
    getText as get,
    findText as find,
};
