"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emotion = require("emotion");

var _styles = require("../../../ui/styles");

// @value styles: 'formalist-theme/theme/index.mcss';
var base = /*#__PURE__*/(0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "1rem"
  }];
});

var label = /*#__PURE__*/(0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "cursor": "pointer",
    "marginRight": "1rem"
  }];
});

var hint = /*#__PURE__*/(0, _emotion.css)([_styles.colours.greyLightColor, _styles.typography.small, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{}];
});

var error = /*#__PURE__*/(0, _emotion.css)([_styles.colours.errorColor], [], function createEmotionStyledRules() {
  return [{}];
});
exports.default = {
  base: base,
  label: label,
  hint: hint,
  error: error
};