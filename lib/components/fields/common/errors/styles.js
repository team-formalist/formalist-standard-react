"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.item = exports.list = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../../../ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([_styles.colours.errorColor, _styles.typography.sans, _styles.typography.normal, _styles.typography.lineHeightNormal], [], function createEmotionStyledRules() {
  return [{
    "marginTop": "0.6em"
  }];
});

var list = /*#__PURE__*/exports.list = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "listStyle": "disc",
    "marginLeft": "1.6em"
  }];
});

var item = /*#__PURE__*/exports.item = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "0.3rem"
  }];
});