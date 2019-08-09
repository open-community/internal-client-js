// ============================================================
// Import packages
import { URL, resolve } from 'url';
import fetch from 'node-fetch';
import Error404 from './httpErrors/Error404';

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
        const result = await this.fetch(path, {
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
        console.log(this.url);
        const url = resolve(this.url.href, path);
        try {
            const result = await fetch(url, params);
            return result;
        } catch (err) {
            if (err.code === 404) {
                throw new Error404();
            }

            throw err;
        }
    }

    async GET(path, params) {
        const result = await this.fetch(path, {
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
        const result = await this.fetch(path, {
            ...params,
            method: 'POST',
        });

        return result;
    }

    async PUT(path, params) {
        const result = await this.fetch(path, {
            ...params,
            method: 'PUT',
        });

        return result;
    }
}

// ============================================================
// Exports
export default Fetcher;
