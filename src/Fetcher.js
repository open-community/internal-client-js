// ============================================================
// Import packages
import { URL } from 'url';
import fetch from 'node-fetch';
import { NotFound, ClientError } from './httpErrors';

// ============================================================
// Module's constants and variables
const ResponseType = {
    JSON: 'json',
    TEXT: 'text',
    BLOB: 'blob',
};

// ============================================================
// Class
class Fetcher {
    /**
     *
     * @param {URL}    url
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Add a search param to the URL.
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
     * Perform a a HTTP DELETE fetch.
     * @param {string} path
     * @param {object} params
     */
    async DELETE(path, params = {}, { response: responseType = 'json' } = {}) {
        const response = await this.rawDELETE(path, params);
        switch (responseType) {
        case ResponseType.JSON:
            return response.json();
        case ResponseType.TEXT:
            return response.text();
        case false:
            return undefined;
        default:
            return response.blob();
        }
    }

    /**
     * Perform a fetch
     * @param {string} path
     * @param {Object} params
     * @public
     */
    async fetch(path = '/', params) {
        // const url = resolve(this.url.href, path);

        const url = new URL(path, this.url);

        // Copying search params
        this.url.searchParams.forEach((value, name) => {
            url.searchParams.append(name, value);
        });

        const response = await fetch(url, params);

        if (response.ok) {
            return response;
        }

        if (response.status === 404) {
            throw new NotFound(response);
        }

        throw new ClientError(response);
    }

    /**
     * Perform a fetch
     * @param {string} path
     * @param {Object} params
     * @public
     */
    async fetchJSON(path = '/', params = {}) {
        const response = await this.fetch(path, params);
        return response.json();
    }

    async GET(path, params = {}, { response: responseType = 'json' } = {}) {
        const response = await this.rawGET(path, params);
        switch (responseType) {
        case ResponseType.JSON:
            return response.json();
        case ResponseType.TEXT:
            return response.text();
        case false:
            return undefined;
        default:
            return response.blob();
        }
    }

    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */
    getURL() {
        return new URL(this.url);
    }

    async POST(path, params = {}, { response: responseType = 'json' } = {}) {
        const response = await this.rawPOST(path, params);
        switch (responseType) {
        case ResponseType.JSON:
            return response.json();
        case ResponseType.TEXT:
            return response.text();
        case false:
            return undefined;
        default:
            return response.blob();
        }
    }

    async PUT(path, params = {}, { response: responseType = 'json' } = {}) {
        const response = await this.rawPUT(path, params);
        switch (responseType) {
        case ResponseType.JSON:
            return response.json();
        case ResponseType.TEXT:
            return response.text();
        case false:
            return undefined;
        default:
            return response.blob();
        }
    }

    /**
     * Perform a raw HTTP DELETE fetch.
     * @param {string} path
     * @param {object} params
     * @returns {Response}
     */
    async rawDELETE(path, params = {}) {
        const result = await this.fetch(path, {
            ...params,
            method: 'DELETE',
        });

        return result;
    }

    async rawGET(path, params = {}) {
        const result = await this.fetch(path, {
            ...params,
            method: 'GET',
        });

        return result;
    }

    async rawPOST(path, params = {}) {
        const result = await this.fetch(path, {
            ...params,
            method: 'POST',
        });

        return result;
    }

    async rawPUT(path, params = {}) {
        const result = await this.fetch(path, {
            ...params,
            method: 'PUT',
        });

        return result;
    }

    setSearchParam(name, value) {
        this.url.searchParams(name, value);
    }
}

// ============================================================
// Exports
export default Fetcher;

export {
    ResponseType,
};
