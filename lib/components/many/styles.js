"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = exports.addButton = exports.controls = exports.placeholderButton = exports.placeholderText = exports.placeholder = exports.labelErrors = exports.label = exports.header = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("margin-bottom:5rem;");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)("display:flex;align-items:center;padding-bottom:1.5rem;");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)(_styles.typography.headerSmallCaps, ";margin-right:auto;");
var labelErrors = /*#__PURE__*/exports.labelErrors = (0, _emotion.css)(_styles.colours.errorColor, ";");

var placeholder = /*#__PURE__*/exports.placeholder = (0, _emotion.css)(_styles.inputBoxes.inputBox, ";");

var placeholderText = /*#__PURE__*/exports.placeholderText = (0, _emotion.css)(_styles.colours.greyMidColor, ";display:inline-block;padding-top:0.3rem;padding-bottom:0.4rem;margin-right:0.5rem;");
var placeholderButton = /*#__PURE__*/exports.placeholderButton = (0, _emotion.css)(_styles.colours.highlightDarkColor, ";text-decoration:underline;");

var controls = /*#__PURE__*/exports.controls = (0, _emotion.css)("margin-left:auto;");

var addButton = /*#__PURE__*/exports.addButton = (0, _emotion.css)(_styles.buttons.small, ";", _styles.buttons.buttonHighlight, ";");

var set = /*#__PURE__*/exports.set = (0, _emotion.css)("padding-left:0.6rem;padding-top:1rem;width:100%;");