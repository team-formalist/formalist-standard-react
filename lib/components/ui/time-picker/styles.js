"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonActive = exports.button = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});

/* Time picker */

var button = /*#__PURE__*/exports.button = (0, _emotion.css)([_styles.typography.small, _styles.typography.sans, _styles.colours.greyTintBorder, _styles.colours.whiteBackground], [], function createEmotionStyledRules() {
  return [{
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    "appearance": "none",
    "borderStyle": "solid",
    "borderWidth": "0",
    "borderBottomWidth": "1px",
    "cursor": "pointer",
    "display": "block",
    "padding": "0.5rem 1rem",
    "width": "100%",
    "&:hover": {
      "textDecoration": "underline"
    }
  }];
});

var buttonActive = /*#__PURE__*/exports.buttonActive = (0, _emotion.css)([_styles.colours.highlightLightBackground], [], function createEmotionStyledRules() {
  return [{}];
});