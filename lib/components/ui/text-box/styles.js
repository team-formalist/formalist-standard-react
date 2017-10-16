"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.textBox = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var textBox = /*#__PURE__*/exports.textBox = (0, _emotion.css)("composes:", _styles.inputBoxes.inputBox, ";");

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)("composes:", _styles.inputBoxes.error, ";");

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)("composes:", _styles.inputBoxes.focus, ";");

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)("composes:", _styles.inputBoxes.xsmall, ";");

var small = /*#__PURE__*/exports.small = (0, _emotion.css)("composes:", _styles.inputBoxes.small, ";");

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)("composes:", _styles.inputBoxes.normal, ";");

var large = /*#__PURE__*/exports.large = (0, _emotion.css)("composes:", _styles.inputBoxes.large, ";");

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)("composes:", _styles.inputBoxes.xlarge, ";");