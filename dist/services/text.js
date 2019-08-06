"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = createText;
exports["delete"] = deleteText;
exports.get = getText;
exports.find = findText;

var _Error = _interopRequireDefault(require("../httpErrors/Error404"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// ============================================================
// Functions

/**
 *
 * @param {Fetcher} client
 */
function createText(_x, _x2) {
  return _createText.apply(this, arguments);
}
/**
 *
 * @param {Fetcher} client
 */


function _createText() {
  _createText = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(client, _ref) {
    var text, fetchParams, createdText;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            text = _ref.text;
            fetchParams = {
              body: text
            };
            _context.prev = 2;
            _context.next = 5;
            return client.POST('/text', fetchParams);

          case 5:
            createdText = _context.sent;
            return _context.abrupt("return", createdText);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](2);

            if (!(_context.t0 instanceof _Error["default"])) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", undefined);

          case 13:
            throw _context.t0;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 9]]);
  }));
  return _createText.apply(this, arguments);
}

function deleteText(_x3, _x4) {
  return _deleteText.apply(this, arguments);
}
/**
 *
 * @param {Fetcher} client
 */


function _deleteText() {
  _deleteText = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(client, _ref2) {
    var id;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = _ref2.id;
            _context2.next = 3;
            return client.DELETE("/text/".concat(id));

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _deleteText.apply(this, arguments);
}

function getText(_x5, _x6) {
  return _getText.apply(this, arguments);
}
/**
 * @param {Fetcher} client
 * @returns {Text[]}
 */


function _getText() {
  _getText = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(client, _ref3) {
    var id, createdText;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = _ref3.id;
            _context3.next = 3;
            return client.GET("/text/".concat(id));

          case 3:
            createdText = _context3.sent;
            return _context3.abrupt("return", createdText);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getText.apply(this, arguments);
}

function findText(_x7, _x8) {
  return _findText.apply(this, arguments);
} // ============================================================
// Exports


function _findText() {
  _findText = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(client, _ref4) {
    var _ref4$author, authorAccount, authorIdentity, content, context, _ref4$creationDate, creationDateMax, creationDateMin, _ref4$deletionDate, deletionDateMax, deletionDateMin, id, owner, _ref4$pagination, paginationOffset, paginationSize, search, sort, title, listTexts;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _ref4$author = _ref4.author;
            _ref4$author = _ref4$author === void 0 ? {} : _ref4$author;
            authorAccount = _ref4$author.account, authorIdentity = _ref4$author.identity, content = _ref4.content, context = _ref4.context, _ref4$creationDate = _ref4.creationDate, creationDateMax = _ref4$creationDate.max, creationDateMin = _ref4$creationDate.min, _ref4$deletionDate = _ref4.deletionDate, deletionDateMax = _ref4$deletionDate.max, deletionDateMin = _ref4$deletionDate.min, id = _ref4.id, owner = _ref4.owner, _ref4$pagination = _ref4.pagination, paginationOffset = _ref4$pagination.offset, paginationSize = _ref4$pagination.size, search = _ref4.search, sort = _ref4.sort, title = _ref4.title;
            client.appendSearchParams('author.account.id', authorAccount);
            client.appendSearchParams('author.identity.id', authorIdentity);
            client.appendSearchParams('content', content);
            client.appendSearchParams('context.id', context);
            client.appendSearchParams('creation-date.max', creationDateMax);
            client.appendSearchParams('creation-date.min', creationDateMin);
            client.appendSearchParams('deletion-date.max', deletionDateMax);
            client.appendSearchParams('deletion-date.min', deletionDateMin);
            client.appendSearchParams('id', id);
            client.appendSearchParams('owner.id', owner);
            client.appendSearchParams('pagination.offset', paginationOffset);
            client.appendSearchParams('pagination.size', paginationSize);
            client.appendSearchParams('search', search);
            client.appendSearchParams('sort', sort);
            client.appendSearchParams('title', title);
            _context4.next = 20;
            return client.GET('/text');

          case 20:
            listTexts = _context4.sent;
            return _context4.abrupt("return", listTexts);

          case 22:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _findText.apply(this, arguments);
}
//# sourceMappingURL=text.js.map
