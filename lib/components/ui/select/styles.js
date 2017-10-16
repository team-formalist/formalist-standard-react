"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.select = exports.labelFocus = exports.labelError = exports.label = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)("position:relative;&:after{top:50%;right:1em;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none;border-color:transparent;border-top-color:", _styles.colours.values.greyLight, ";border-width:0.3em;margin-left:-0.3em;margin-top:-0.1em;}");

var labelError = /*#__PURE__*/exports.labelError = (0, _emotion.css)("&:after{border-top-color:", _styles.colours.values.error, ";}");

var labelFocus = /*#__PURE__*/exports.labelFocus = (0, _emotion.css)("&:after{border-top-color:", _styles.colours.values.highlight, ";}");

var select = /*#__PURE__*/exports.select = (0, _emotion.css)("composes:", _styles.inputBoxes.inputBox, ";appearance:none;");

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)("composes:", _styles.inputBoxes.error, ";");

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)("composes:", _styles.inputBoxes.focus, ";");

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)("composes:", _styles.inputBoxes.xsmall, ";");

var small = /*#__PURE__*/exports.small = (0, _emotion.css)("composes:", _styles.inputBoxes.small, ";");

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)("composes:", _styles.inputBoxes.normal, ";");

var large = /*#__PURE__*/exports.large = (0, _emotion.css)("composes:", _styles.inputBoxes.large, ";");

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)("composes:", _styles.inputBoxes.xlarge, ";");