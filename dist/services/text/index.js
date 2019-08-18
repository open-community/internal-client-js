"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  findIterator: true
};
Object.defineProperty(exports, "findIterator", {
  enumerable: true,
  get: function () {
    return _find.findIterator;
  }
});

var _text = require("./text");

Object.keys(_text).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _text[key];
    }
  });
});

var _find = require("./find");
//# sourceMappingURL=index.js.map
