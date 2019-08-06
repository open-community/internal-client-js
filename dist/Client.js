"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Fetcher = _interopRequireDefault(require("./Fetcher"));

var text = _interopRequireWildcard(require("./services/text"));

var _constants = require("./constants");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ============================================================
// Class
var Client =
/*#__PURE__*/
function () {
  /**
   * @param {Object.<string>} urlMap
   * @public
   */
  function Client() {
    var urlMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Client);

    var servicesName = Object.keys(_constants.Services);
    Object.entries(urlMap).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          name = _ref2[0],
          url = _ref2[1];

      if (!servicesName.includes(name)) {
        throw new Error("Unknown service: ".concat(name));
      }

      if (typeof url !== 'string') {
        throw new Error("".concat(name, ": Not a string"));
      }
    });
    this.urlMap = _objectSpread({}, urlMap);
  }
  /**
   * @returns {Fetcher}
   * @internal
   */


  _createClass(Client, [{
    key: "getNewFetcher",
    value: function getNewFetcher(type) {
      return new _Fetcher["default"](this, this.getURL(type));
    }
    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */

  }, {
    key: "getURL",
    value: function getURL(type) {
      var url = this.urlMap[type];

      if (!url) {
        throw new Error('No URL defined for this server type');
      }

      return new URL(url);
    }
  }]);

  return Client;
}();

Client.prototype.text = Object.fromEntries(Object.entries(text).map(function map(_ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      name = _ref4[0],
      fct = _ref4[1];

  return [name, fct.bind(undefined, this.getNewFetcher(_constants.Services.TEXT))];
})); // ============================================================
// Exports

var _default = Client;
exports["default"] = _default;
//# sourceMappingURL=Client.js.map
