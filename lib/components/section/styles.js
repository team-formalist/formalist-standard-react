"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("./ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "5rem"
  }];
});

var label = /*#__PURE__*/exports.label = (0, _emotion.css)([_styles.typography.headerSmallCaps], [], function createEmotionStyledRules() {
  return [{
    "borderBottom": "3px solid #f09",
    "marginBottom": "1.8rem",
    "paddingBottom": "1.8rem"
  }];
});