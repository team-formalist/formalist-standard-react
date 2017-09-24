"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([fields.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([fields.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([fields.header], [baseInline], function createEmotionStyledRules(x0) {
  return [_defineProperty({}, "." + x0 + " &", {
    "paddingTop": "0"
  })];
});