"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.error = exports.hint = exports.label = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../../../ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("margin-bottom:1rem;");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)("cursor:pointer;margin-right:1rem;");

var hint = /*#__PURE__*/exports.hint = (0, _emotion.css)("composes:", _styles.colours.greyLightColor, " ", _styles.typography.small, " ", _styles.typography.sans, ";");

var error = /*#__PURE__*/exports.error = (0, _emotion.css)("composes:", _styles.colours.errorColor, ";");