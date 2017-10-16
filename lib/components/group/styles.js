"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.item = exports.groupItems = exports.label = exports.group = undefined;

var _emotion = require("emotion");

var _styles = require("../ui/styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var group = /*#__PURE__*/exports.group = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});

var label = /*#__PURE__*/exports.label = (0, _emotion.css)([_styles.typography.headerSmallCaps], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "1.8rem"
  }];
});

var groupItems = /*#__PURE__*/exports.groupItems = (0, _emotion.css)([], [breakpoints.small], function createEmotionStyledRules(x0) {
  return [_defineProperty({
    "display": "-webkit-box; display: -ms-flexbox; display: flex"
  }, "@media (" + x0 + ")", {
    "display": "block"
  })];
});

var item = /*#__PURE__*/exports.item = (0, _emotion.css)([], [breakpoints.small], function createEmotionStyledRules(x0) {
  return [_defineProperty({
    "WebkitBoxFlex": "1",
    "msFlex": "1",
    "flex": "1",
    "marginLeft": "1rem",
    "marginRight": "1rem",
    "&:first-child": {
      "marginLeft": "0"
    },
    "&:last-child": {
      "marginRight": "0"
    }
  }, "@media (" + x0 + ")", {
    "marginLeft": "0",
    "marginRight": "0"
  })];
});