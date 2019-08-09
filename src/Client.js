// ============================================================
// Import packages
import { URL } from 'url';

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
        const servicesName = Object.values(Services);

        Object.entries(urlMap).forEach(([name, url]) => {
            if (!servicesName.includes(name)) {
                throw new Error(`Unknown service: ${name}`);
            }

            if (url instanceof Object) {
                throw new Error(`${name}: Not a valid value `);
            }
        });

        this.urlMap = { ...urlMap };

        this.text = Object.entries(text).reduce(
            (acc, [name, fct]) => {
                acc[name] = fct.bind(undefined, this.getNewFetcher(Services.TEXT));
                return acc;
            },
            {},
        );
    }

    /**
     * @returns {Fetcher}
     * @internal
     */
    getNewFetcher(type) {
        return new Fetcher(
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

/* Client.prototype.text = Object.fromEntries(
    Object.entries(text).map(([name, fct]) => [
        name,
        fct.bind(undefined, this.getNewFetcher(Services.TEXT)),
    ]),
); */

// ============================================================
// Exports
export default Client;
