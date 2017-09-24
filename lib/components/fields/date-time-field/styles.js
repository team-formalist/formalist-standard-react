"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nowButton = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([fields.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([fields.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([fields.header], [], function createEmotionStyledRules() {
  return [{}];
});

var nowButton = /*#__PURE__*/exports.nowButton = (0, _emotion.css)([_styles.buttons.small, _styles.buttons.buttonHighlight], [], function createEmotionStyledRules() {
  return [{
    "float": "right",
    "marginTop": "-0.3rem"
  }];
});