"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.item = exports.groupItems = exports.label = exports.group = undefined;

var _emotion = require("emotion");

var _styles = require("../ui/styles");

var group = /*#__PURE__*/exports.group = (0, _emotion.css)();

var label = /*#__PURE__*/exports.label = (0, _emotion.css)(_styles.typography.headerSmallCaps, ";margin-bottom:1.8rem;");

var groupItems = /*#__PURE__*/exports.groupItems = (0, _emotion.css)("display:flex;@media(", _styles.breakpoints.small, "){display:block;}");

var item = /*#__PURE__*/exports.item = (0, _emotion.css)("flex:1;margin-left:1rem;margin-right:1rem;&:first-child{margin-left:0;}&:last-child{margin-right:0;}@media(", _styles.breakpoints.small, "){margin-left:0;margin-right:0;}");