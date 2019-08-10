// ============================================================
// Import packages
import { URL, resolve } from 'url';
import fetch from 'node-fetch';
import { NotFound, ClientError } from './httpErrors';

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
    async DELETE(path, params) {
        const result = await this.fetchJSON(path, {
            ...params,
            method: 'DELETE',
        });

        return result;
    }

    /**
     * Perform a fetch
     * @param {string} path
     * @param {Object} params
     * @public
     */
    async fetch(path = '/', params) {
        const url = resolve(this.url.href, path);

        const response = await fetch(url, params);

        if (response.ok) {
            return response;
        }

        if (response.code === 404) {
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
    async fetchJSON(path = '/', params) {
        const response = await this.fetch(path, params);
        return response.json();
    }

    async GET(path, params) {
        const result = await this.fetchJSON(path, {
            ...params,
            method: 'GET',
        });

        return result;
    }

    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */
    getURL() {
        return new URL(this.url);
    }

    async POST(path, params) {
        const result = await this.fetchJSON(path, {
            ...params,
            method: 'POST',
        });

        return result;
    }

    async PUT(path, params) {
        const result = await this.fetchJSON(path, {
            ...params,
            method: 'PUT',
        });

        return result;
    }
}

// ============================================================
// Exports
export default Fetcher;
