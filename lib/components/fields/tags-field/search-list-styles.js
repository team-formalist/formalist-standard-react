"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.optionButtonFocus = exports.optionButton = undefined;

var _emotion = require("emotion");

var _styles = require("../../ui/styles");

var optionButton = /*#__PURE__*/exports.optionButton = (0, _emotion.css)("composes:", _styles.typography.small, " ", _styles.typography.sans, " ", _styles.colours.greyTintBorder, " ", _styles.colours.whiteBackground, ";border-width:0;border-bottom-width:1px;border-style:solid;cursor:pointer;display:block;padding:0.7rem 1rem;text-align:left;width:100%;");
var optionButtonFocus = /*#__PURE__*/exports.optionButtonFocus = (0, _emotion.css)("text-decoration:underline;");