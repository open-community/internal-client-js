"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResponseType = exports.default = void 0;

var _url = require("url");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _httpErrors = require("./httpErrors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import packages
// ============================================================
// Module's constants and variables
const ResponseType = {
  JSON: 'json',
  TEXT: 'text',
  BLOB: 'blob'
}; // ============================================================
// Class

exports.ResponseType = ResponseType;

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


  async DELETE(path, params = {}, {
    response: responseType = 'json'
  } = {}) {
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
    const url = new _url.URL(path, this.url); // Copying search params

    this.url.searchParams.forEach((value, name) => {
      url.searchParams.append(name, value);
    });
    const response = await (0, _nodeFetch.default)(url, params);

    if (response.ok) {
      return response;
    }

    if (response.status === 404) {
      throw new _httpErrors.NotFound(response);
    }

    throw new _httpErrors.ClientError(response);
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

  async GET(path, params = {}, {
    response: responseType = 'json'
  } = {}) {
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
    return new _url.URL(this.url);
  }

  async POST(path, params = {}, {
    response: responseType = 'json'
  } = {}) {
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

  async PUT(path, params = {}, {
    response: responseType = 'json'
  } = {}) {
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
    const result = await this.fetch(path, { ...params,
      method: 'DELETE'
    });
    return result;
  }

  async rawGET(path, params = {}) {
    const result = await this.fetch(path, { ...params,
      method: 'GET'
    });
    return result;
  }

  async rawPOST(path, params = {}) {
    const result = await this.fetch(path, { ...params,
      method: 'POST'
    });
    return result;
  }

  async rawPUT(path, params = {}) {
    const result = await this.fetch(path, { ...params,
      method: 'PUT'
    });
    return result;
  }

} // ============================================================
// Exports


var _default = Fetcher;
exports.default = _default;
//# sourceMappingURL=Fetcher.js.map
