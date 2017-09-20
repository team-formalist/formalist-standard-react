"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nowButton = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _sharedStyles = require("../shared-styles");

var shared = _interopRequireWildcard(_sharedStyles);

var _styles = require("../../ui/button/styles");

var button = _interopRequireWildcard(_styles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([shared.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([shared.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var nowButton = /*#__PURE__*/exports.nowButton = (0, _emotion.css)([button.small, button.buttonHighlight], [], function createEmotionStyledRules() {
  return [{
    "float": "right",
    "marginTop": "-0.3rem"
  }];
});