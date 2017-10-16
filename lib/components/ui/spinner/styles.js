"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spinner = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var spin = /*#__PURE__*/(0, _emotion.keyframes)("0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}");

var spinner = /*#__PURE__*/exports.spinner = (0, _emotion.css)("animation:", spin, " 700ms infinite linear;border:0.25rem solid ", _styles.colours.values.greyLight, ";border-radius:50%;border-top-color:", _styles.colours.values.highlightDark, ";height:1rem;width:1rem;");