"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonActive = exports.button = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)();

/* Time picker */

var button = /*#__PURE__*/exports.button = (0, _emotion.css)("composes:", _styles.typography.small, " ", _styles.typography.sans, " ", _styles.colours.greyTintBorder, " ", _styles.colours.whiteBackground, ";appearance:none;border-style:solid;border-width:0;border-bottom-width:1px;cursor:pointer;display:block;padding:0.5rem 1rem;width:100%;&:hover{text-decoration:underline;}");

var buttonActive = /*#__PURE__*/exports.buttonActive = (0, _emotion.css)("composes:", _styles.colours.highlightLightBackground, ";");