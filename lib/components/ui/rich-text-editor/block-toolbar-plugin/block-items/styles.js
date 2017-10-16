"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconWrapperActive = exports.iconWrapper = exports.buttonActive = exports.button = exports.list = exports.container = undefined;

var _emotion = require("emotion");

var _styles = require("../../../styles");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)("composes:", _styles.colours.greyLightBorder, ";border-style:solid;border-right-width:1px;margin-right:-1px;flex:1;");

var list = /*#__PURE__*/exports.list = (0, _emotion.css)("padding-top:0.8em;padding-bottom:0.8em;");

var button = /*#__PURE__*/exports.button = (0, _emotion.css)("composes:", _styles.colours.greyMidColor, ";display:block;padding:0.4em 0.8em;text-align:center;");

var buttonActive = /*#__PURE__*/exports.buttonActive = (0, _emotion.css)("composes:", _styles.colours.primaryColor, " ", _styles.typography.sansBold, ";");

var iconWrapper = /*#__PURE__*/exports.iconWrapper = (0, _emotion.css)("display:flex;align-items:center;fill:", _styles.colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");
var iconWrapperActive = /*#__PURE__*/exports.iconWrapperActive = (0, _emotion.css)("fill:", _styles.colours.values.primary, ";");