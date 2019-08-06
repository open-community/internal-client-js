// ============================================================
// Import modules
import Fetcher from './Fetcher';
import * as text from './services/text';
import { Services } from './constants';

// ============================================================
// Class
class Client {
    /**
     * @param {Object.<string>} urlMap
     * @public
     */
    constructor(urlMap = {}) {
        const servicesName = Object.keys(Services);

        Object.entries(urlMap).forEach(([name, url]) => {
            if (!servicesName.includes(name)) {
                throw new Error(`Unknown service: ${name}`);
            }

            if (typeof url !== 'string') {
                throw new Error(`${name}: Not a string`);
            }
        });

        this.urlMap = { ...urlMap };
    }

    /**
     * @returns {Fetcher}
     * @internal
     */
    getNewFetcher(type) {
        return new Fetcher(
            this,
            this.getURL(type),
        );
    }

    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */
    getURL(type) {
        const url = this.urlMap[type];

        if (!url) {
            throw new Error('No URL defined for this server type');
        }

        return new URL(url);
    }
}

Client.prototype.text = Object.fromEntries(
    Object.entries(text).map(function map([name, fct]) {
        return [
            name,
            fct.bind(undefined, this.getNewFetcher(Services.TEXT)),
        ];
    }),
);

// ============================================================
// Exports
export default Client;
