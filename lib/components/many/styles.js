"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.addButton = exports.controls = exports.placeholderButton = exports.placeholderText = exports.placeholder = exports.labelErrors = exports.label = exports.header = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "5rem"
  }];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "-webkit-box; display: -ms-flexbox; display: flex",
    "WebkitBoxAlign": "center",
    "msFlexAlign": "center",
    "alignItems": "center",
    "paddingBottom": "1.5rem"
  }];
});

var label = /*#__PURE__*/exports.label = (0, _emotion.css)([_styles.typography.headerSmallCaps], [], function createEmotionStyledRules() {
  return [{
    "marginRight": "auto"
  }];
});
var labelErrors = /*#__PURE__*/exports.labelErrors = (0, _emotion.css)([_styles.colours.errorColor], [], function createEmotionStyledRules() {
  return [{}];
});

var placeholder = /*#__PURE__*/exports.placeholder = (0, _emotion.css)([_styles.inputBoxes.inputBox], [], function createEmotionStyledRules() {
  return [{}];
});

var placeholderText = /*#__PURE__*/exports.placeholderText = (0, _emotion.css)([_styles.colours.greyMidColor], [], function createEmotionStyledRules() {
  return [{
    "display": "inline-block",
    "paddingTop": "0.3rem",
    "paddingBottom": "0.4rem",
    "marginRight": "0.5rem"
  }];
});
var placeholderButton = /*#__PURE__*/exports.placeholderButton = (0, _emotion.css)([_styles.colours.highlightDarkColor], [], function createEmotionStyledRules() {
  return [{
    "textDecoration": "underline"
  }];
});

var controls = /*#__PURE__*/exports.controls = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "marginLeft": "auto"
  }];
});

var addButton = /*#__PURE__*/exports.addButton = (0, _emotion.css)([_styles.buttons.small, _styles.buttons.buttonHighlight], [], function createEmotionStyledRules() {
  return [{}];
});

var set = /*#__PURE__*/exports.set = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "paddingLeft": "0.6rem",
    "paddingTop": "1rem",
    "width": "100%"
  }];
});