"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _url = require("url");

var _Fetcher = _interopRequireDefault(require("./Fetcher"));

var text = _interopRequireWildcard(require("./services/text"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import packages
// ============================================================
// Import modules
// ============================================================
// Class
class Client {
  /**
   * @param {Object.<string>} urlMap
   * @public
   */
  constructor(urlMap = {}) {
    const servicesName = Object.values(_constants.Services);
    Object.entries(urlMap).forEach(([name, url]) => {
      if (!servicesName.includes(name)) {
        throw new Error(`Unknown service: ${name}`);
      }

      if (url instanceof Object) {
        throw new Error(`${name}: Not a valid value `);
      }
    });
    this.urlMap = { ...urlMap
    };
    this.text = Object.entries(text).reduce((acc, [name, fct]) => {
      acc[name] = fct.bind(undefined, this.getNewFetcher(_constants.Services.TEXT));
      return acc;
    }, {});
  }
  /**
   * @returns {Fetcher}
   * @internal
   */


  getNewFetcher(type) {
    return new _Fetcher.default(this.getURL(type));
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

    return new _url.URL(url);
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


var _default = Client;
exports.default = _default;
//# sourceMappingURL=Client.js.map
