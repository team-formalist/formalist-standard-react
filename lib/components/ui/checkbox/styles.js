"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.input = exports.label = exports.button = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var button = /*#__PURE__*/exports.button = (0, _emotion.css)([_styles.typography.lineHeightNormal], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "0.2em"
  }];
});

var label = /*#__PURE__*/exports.label = (0, _emotion.css)([_styles.typography.sans, _styles.typography.normal], [], function createEmotionStyledRules() {
  return [{
    "cursor": "pointer",
    "marginLeft": "0.5em",
    "paddingBottom": "0.2em"
  }];
});

var input = /*#__PURE__*/exports.input = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "cursor": "pointer",
    "position": "relative",
    "top": "-0.1em"
  }];
});

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)([_styles.colours.errorColor], [], function createEmotionStyledRules() {
  return [{}];
});

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)([], [_styles.colours.values.highlight], function createEmotionStyledRules(x0) {
  return [{
    "borderBottom": "1px solid " + x0
  }];
});

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)([_styles.inputBoxes.xsmall], [], function createEmotionStyledRules() {
  return [{}];
});

var small = /*#__PURE__*/exports.small = (0, _emotion.css)([_styles.inputBoxes.small], [], function createEmotionStyledRules() {
  return [{}];
});

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)([_styles.inputBoxes.normal], [], function createEmotionStyledRules() {
  return [{}];
});

var large = /*#__PURE__*/exports.large = (0, _emotion.css)([_styles.inputBoxes.large], [], function createEmotionStyledRules() {
  return [{}];
});

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)([_styles.inputBoxes.xlarge], [], function createEmotionStyledRules() {
  return [{}];
});