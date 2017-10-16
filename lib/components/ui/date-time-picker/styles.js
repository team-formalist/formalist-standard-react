"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timePicker = exports.datePicker = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("display:flex;@media(", _styles.breakpoints.small, "){display:block;}");

var datePicker = /*#__PURE__*/exports.datePicker = (0, _emotion.css)("flex:1;margin-right:1rem;@media(", _styles.breakpoints.small, "){margin-left:0;margin-right:0;margin-bottom:1rem;}");

var timePicker = /*#__PURE__*/exports.timePicker = (0, _emotion.css)("flex:1;margin-left:1rem;@media(", _styles.breakpoints.small, "){margin-left:0;margin-right:0;}");