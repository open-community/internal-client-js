"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _url = require("url");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _Fetcher = _interopRequireDefault(require("./Fetcher"));

var text = _interopRequireWildcard(require("./text"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ============================================================
// Class
var Client =
/*#__PURE__*/
function () {
  /**
   * @param {URL} url
   * @public
   */
  function Client(url) {
    _classCallCheck(this, Client);

    this.url = url;
  }
  /**
   * Perform a fetch
   * @param {string} path
   * @param {Object} params
   * @public
   */


  _createClass(Client, [{
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var path,
            params,
            url,
            result,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                path = _args.length > 0 && _args[0] !== undefined ? _args[0] : '/';
                params = _args.length > 1 ? _args[1] : undefined;
                url = (0, _url.resolve)(this.url, path);
                _context.next = 5;
                return (0, _nodeFetch["default"])(url, params);

              case 5:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function fetch() {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
    /**
     * @returns {Fetcher}
     * @public
     */

  }, {
    key: "getNewFetcher",
    value: function getNewFetcher() {
      return new _Fetcher["default"](this);
    }
    /**
     * Return a new URL object
     * @returns {URL}
     * @public
     */

  }, {
    key: "getURL",
    value: function getURL() {
      return new _url.URL(this.url);
    }
  }]);

  return Client;
}();

Client.prototype.text = Object.fromEntries(Object.entries(text).map(function map(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      name = _ref2[0],
      fct = _ref2[1];

  return [name, fct.bind(undefined, this)];
})); // ============================================================
// Exports

var _default = Client;
exports["default"] = _default;
//# sourceMappingURL=Client.js.map
