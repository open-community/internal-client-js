// ============================================================
// Class
class Fetcher {
    /**
     *
     * @param {Client} client
     */
    constructor(client) {
        this.client = client;
        this.url = client.getURL();
    }

    /**
     * Add a search param
     * @param {string} name
     * @param {*} value
     * @public
     */
    appendSearchParams(name, value) {
        if (!value) {
            return;
        }

        this.url.searchParams.append(name, value);
    }

    /**
     * @param {string} path
     * @param {Object} params
     */
    async fetch(path, params) {
        const result = await this.client.fetch(path, params);
        return result;
    }

    async DELETE(path, params) {
        const result = await this.client.fetch(path, {
            ...params,
            method: 'DELETE',
        });

        return result;
    }

    async GET(path, params) {
        const result = await this.client.fetch(path, {
            ...params,
            method: 'GET',
        });

        return result;
    }

    async POST(path, params) {
        const result = await this.client.fetch(path, {
            ...params,
            method: 'POST',
        });

        return result;
    }

    async PUT(path, params) {
        const result = await this.client.fetch(path, {
            ...params,
            method: 'PUT',
        });

        return result;
    }
}

// ============================================================
// Exports
export default Fetcher;
