"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iconWrapperActive = exports.iconWrapper = exports.buttonActive = exports.button = exports.list = undefined;

var _emotion = require("emotion");

var _styles = require("../../../styles");

var list = /*#__PURE__*/exports.list = (0, _emotion.css)("display:flex;padding-left:0.4em;padding-right:0.4em;");

var button = /*#__PURE__*/exports.button = (0, _emotion.css)(_styles.colours.greyMidColor, ";display:block;padding:0.8em 0.4em;");

var buttonActive = /*#__PURE__*/exports.buttonActive = (0, _emotion.css)(_styles.colours.primaryColor, ";", _styles.typography.sansBold, ";");

var iconWrapper = /*#__PURE__*/exports.iconWrapper = (0, _emotion.css)("display:flex;align-items:center;fill:", _styles.colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");
var iconWrapperActive = /*#__PURE__*/exports.iconWrapperActive = (0, _emotion.css)("fill:", _styles.colours.values.primary, ";font-weight:normal;");