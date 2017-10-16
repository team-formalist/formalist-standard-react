"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.input = exports.label = exports.button = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var button = /*#__PURE__*/exports.button = (0, _emotion.css)("composes:", _styles.typography.lineHeightNormal, ";margin-bottom:0.2em;");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)("composes:", _styles.typography.sans, " ", _styles.typography.normal, ";cursor:pointer;margin-left:0.5em;padding-bottom:0.2em;");

var input = /*#__PURE__*/exports.input = (0, _emotion.css)("cursor:pointer;position:relative;top:-0.1em;");

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)("composes:", _styles.colours.errorColor, ";");

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)("border-bottom:1px solid ", _styles.colours.values.highlight, ";");

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)("composes:", _styles.inputBoxes.xsmall, ";");

var small = /*#__PURE__*/exports.small = (0, _emotion.css)("composes:", _styles.inputBoxes.small, ";");

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)("composes:", _styles.inputBoxes.normal, ";");

var large = /*#__PURE__*/exports.large = (0, _emotion.css)("composes:", _styles.inputBoxes.large, ";");

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)("composes:", _styles.inputBoxes.xlarge, ";");