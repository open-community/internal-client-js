"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _HttpError = _interopRequireDefault(require("./HttpError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ============================================================
// Import modules
// ============================================================
// Errors
class ClientError extends _HttpError.default {} // ============================================================
// Exports


var _default = ClientError;
exports.default = _default;
//# sourceMappingURL=ClientError.js.map
