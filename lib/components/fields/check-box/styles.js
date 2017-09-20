"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _sharedStyles = require("../shared-styles");

var shared = _interopRequireWildcard(_sharedStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([shared.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([shared.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "baseInline &": {
      "paddingTop": "0"
    }
  }];
});