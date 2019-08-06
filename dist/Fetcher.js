"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _url = require("url");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _Error = _interopRequireDefault(require("./httpErrors/Error404"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// ============================================================
// Class
var Fetcher =
/*#__PURE__*/
function () {
  /**
   *
   * @param {URL}    url
   */
  function Fetcher(url) {
    _classCallCheck(this, Fetcher);

    this.url = url;
  }
  /**
   * Add a search param to the URL.
   * @param {string} name
   * @param {*} value
   * @public
   */


  _createClass(Fetcher, [{
    key: "appendSearchParams",
    value: function appendSearchParams(name, value) {
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

  }, {
    key: "DELETE",
    value: function () {
      var _DELETE = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(path, params) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.fetch(path, _objectSpread({}, params, {
                  method: 'DELETE'
                }));

              case 2:
                result = _context.sent;
                return _context.abrupt("return", result);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function DELETE(_x, _x2) {
        return _DELETE.apply(this, arguments);
      }

      return DELETE;
    }()
    /**
     * Perform a fetch
     * @param {string} path
     * @param {Object} params
     * @public
     */

  }, {
    key: "fetch",
    value: function () {
      var _fetch2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var path,
            params,
            url,
            result,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                path = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '/';
                params = _args2.length > 1 ? _args2[1] : undefined;
                url = (0, _url.resolve)(this.url, path);
                _context2.prev = 3;
                _context2.next = 6;
                return (0, _nodeFetch["default"])(url, params);

              case 6:
                result = _context2.sent;
                return _context2.abrupt("return", result);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](3);

                if (!(_context2.t0.code === 404)) {
                  _context2.next = 14;
                  break;
                }

                throw new _Error["default"]();

              case 14:
                throw _context2.t0;

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 10]]);
      }));

      function fetch() {
        return _fetch2.apply(this, arguments);
      }

      return fetch;
    }()
  }, {
    key: "GET",
    value: function () {
      var _GET = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(path, params) {
        var result;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.fetch(path, _objectSpread({}, params, {
                  method: 'GET'
                }));

              case 2:
                result = _context3.sent;
                return _context3.abrupt("return", result);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function GET(_x3, _x4) {
        return _GET.apply(this, arguments);
      }

      return GET;
    }()
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
  }, {
    key: "POST",
    value: function () {
      var _POST = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(path, params) {
        var result;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.fetch(path, _objectSpread({}, params, {
                  method: 'POST'
                }));

              case 2:
                result = _context4.sent;
                return _context4.abrupt("return", result);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function POST(_x5, _x6) {
        return _POST.apply(this, arguments);
      }

      return POST;
    }()
  }, {
    key: "PUT",
    value: function () {
      var _PUT = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee5(path, params) {
        var result;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.fetch(path, _objectSpread({}, params, {
                  method: 'PUT'
                }));

              case 2:
                result = _context5.sent;
                return _context5.abrupt("return", result);

              case 4:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function PUT(_x7, _x8) {
        return _PUT.apply(this, arguments);
      }

      return PUT;
    }()
  }]);

  return Fetcher;
}(); // ============================================================
// Exports


var _default = Fetcher;
exports["default"] = _default;
//# sourceMappingURL=Fetcher.js.map
