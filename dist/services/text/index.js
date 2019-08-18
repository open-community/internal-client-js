"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  find: true
};
Object.defineProperty(exports, "find", {
  enumerable: true,
  get: function () {
    return _findText.findText;
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

var _findText = require("./findText");
//# sourceMappingURL=index.js.map
