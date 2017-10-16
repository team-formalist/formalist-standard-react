"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonArrow = exports.buttonText = exports.nextButton = exports.prevButton = exports.buttons = exports.info = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("display:flex;padding:0.7rem 1rem;");

var info = /*#__PURE__*/exports.info = (0, _emotion.css)("margin-left:0;margin-right:auto;");

var buttons = /*#__PURE__*/exports.buttons = (0, _emotion.css)("margin-left:auto;margin-right:0;");
var prevButton = /*#__PURE__*/exports.prevButton = (0, _emotion.css)("margin-right:1rem;&:hover{color:", _styles.colours.values.error, ";}");

var nextButton = /*#__PURE__*/exports.nextButton = (0, _emotion.css)("&:hover{color:", _styles.colours.values.error, ";}");

var buttonText = /*#__PURE__*/exports.buttonText = (0, _emotion.css)("text-decoration:underline;");

var buttonArrow = /*#__PURE__*/exports.buttonArrow = (0, _emotion.css)(_styles.typography.fallback, ";");