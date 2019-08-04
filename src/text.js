// ============================================================
// Functions
async function createText(
    client,
    {
        text,
    },
) {
    const fetchParams = {
        body: text,
    };

    /** @type {Fetcher} */
    const fetcher = client.getFetcher();

    const createdText = await fetcher.POST('/text', fetchParams);

    return createdText;
}

async function deleteText(
    client,
    {
        id,
    },
) {
    const fetcher = client.getFetcher();

    await fetcher.DELETE(`/text/${id}`);
}

async function getText(
    client,
    {
        id,
    },
) {
    const fetcher = client.getFetcher();

    const createdText = await fetcher.GET(`/text/${id}`);

    return createdText;
}

/**
 * @returns {Text[]}
 */
async function listText(
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
    /** @type {Fetcher} */
    const fetcher = client.getFetcher();

    fetcher.appendSearchParams('author.account.id', authorAccount);
    fetcher.appendSearchParams('author.identity.id', authorIdentity);
    fetcher.appendSearchParams('content', content);
    fetcher.appendSearchParams('context.id', context);
    fetcher.appendSearchParams('creation-date.max', creationDateMax);
    fetcher.appendSearchParams('creation-date.min', creationDateMin);
    fetcher.appendSearchParams('deletion-date.max', deletionDateMax);
    fetcher.appendSearchParams('deletion-date.min', deletionDateMin);
    fetcher.appendSearchParams('id', id);
    fetcher.appendSearchParams('owner.id', owner);
    fetcher.appendSearchParams('pagination.offset', paginationOffset);
    fetcher.appendSearchParams('pagination.size', paginationSize);
    fetcher.appendSearchParams('search', search);
    fetcher.appendSearchParams('sort', sort);
    fetcher.appendSearchParams('title', title);

    const listTexts = await fetcher.GET('/text');

    return listTexts;
}

// ============================================================
// Exports
export {
    createText as create,
    deleteText as delete,
    getText as get,
    listText as list,
};
