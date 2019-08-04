// ============================================================
// Import packages
import { URL, resolve } from 'url';
import fetch from 'node-fetch';

// ============================================================
// Import modules
import Fetcher from './Fetcher';
import * as text from './text';

// ============================================================
// Class
class Client {
    /**
     * @param {URL} url
     * @public
     */
    constructor(url) {
        this.url = url;
    }

    /**
     * Perform a fetch
     * @param {string} path
     * @param {Object} params
     * @public
     */
    async fetch(path = '/', params) {
        const url = resolve(this.url, path);
        const result = await fetch(url, params);
        return result;
    }

    /**
     * @returns {Fetcher}
     * @public
     */
    getNewFetcher() {
        return new Fetcher(this);
    }

    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */
    getURL() {
        return new URL(this.url);
    }
}

Client.prototype.text = Object.fromEntries(
    Object.entries(text).map(function map([name, fct]) {
        return [
            name,
            fct.bind(undefined, this),
        ];
    }),
);

// ============================================================
// Exports
export default Client;
