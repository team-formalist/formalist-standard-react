"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.entityWrapper = exports.positioner = undefined;

var _emotion = require("emotion");

var _styles = require("../../../styles");

var positioner = /*#__PURE__*/exports.positioner = (0, _emotion.css)("position:absolute;height:0;");

var entityWrapper = /*#__PURE__*/exports.entityWrapper = (0, _emotion.css)(_styles.colours.greyTintBorder, ";border-top-width:1px;border-top-style:solid;padding:0.8rem 1rem 1rem;");