"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinner = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var spin = /*#__PURE__*/(0, _emotion.keyframes)([], [], function createEmotionStyledRules() {
  return [{
    "0%": {
      "WebkitTransform": "rotate(0deg)",
      "transform": "rotate(0deg)"
    },
    "100%": {
      "WebkitTransform": "rotate(360deg)",
      "transform": "rotate(360deg)"
    }
  }];
});

var spinner = /*#__PURE__*/exports.spinner = (0, _emotion.css)([], [spin, _styles.colours.values.greyLight, _styles.colours.values.highlightDark], function createEmotionStyledRules(x0, x1, x2) {
  return [{
    "WebkitAnimation": x0 + " 700ms infinite linear",
    "animation": x0 + " 700ms infinite linear",
    "border": "0.25rem solid " + x1,
    "borderRadius": "50%",
    "borderTopColor": x2,
    "height": "1rem",
    "width": "1rem"
  }];
});