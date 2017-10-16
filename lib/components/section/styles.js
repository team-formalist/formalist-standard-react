"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.label = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../ui/styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("margin-bottom:5rem;");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)(_styles.typography.headerSmallCaps, ";border-bottom:3px solid ", _styles.colours.values.greyLight, ";margin-bottom:1.8rem;padding-bottom:1.8rem;");