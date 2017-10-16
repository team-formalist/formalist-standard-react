"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.button = exports.list = exports.container = undefined;

var _emotion = require("emotion");

var _styles = require("../../../styles");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)("composes:", _styles.colours.greyLightBorder, ";border-style:solid;border-left-width:1px;flex:1;");

var list = /*#__PURE__*/exports.list = (0, _emotion.css)("padding-top:0.8em;padding-bottom:0.8em;");

var button = /*#__PURE__*/exports.button = (0, _emotion.css)("composes:", _styles.typography.sans, ";display:block;padding:0.4em 0.8em;white-space:nowrap;");