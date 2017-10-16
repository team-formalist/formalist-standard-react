"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.content = exports.removeX = exports.removeText = exports.remove = exports.toolbar = exports.label = exports.header = exports.containerSelected = exports.container = exports.caret = exports.wrapper = undefined;

var _emotion = require("emotion");

var _styles = require("../../../../styles");

var wrapper = /*#__PURE__*/exports.wrapper = (0, _emotion.css)("position:relative;");

var caret = /*#__PURE__*/exports.caret = (0, _emotion.css)("position:absolute;overflow:hidden;width:0;");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)(_styles.colours.whiteBackground, ";margin-bottom:1.5rem;outline:3px transparent solid;transition-property:outline;transition-duration:100ms;");

var containerSelected = /*#__PURE__*/exports.containerSelected = (0, _emotion.css)("outline:3px ", _styles.colours.values.highlight, " solid;");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)(_styles.colours.greyTintBorder, ";border-bottom-width:1px;border-bottom-style:solid;align-items:center;display:flex;padding:0.5rem 1.5rem;");
var label = /*#__PURE__*/exports.label = (0, _emotion.css)(_styles.typography.small, ";", _styles.colours.greyMidColor, ";margin-left:0;margin-right:auto;");

var toolbar = /*#__PURE__*/exports.toolbar = (0, _emotion.css)("margin-right:0;margin-left:auto;");

var remove = /*#__PURE__*/exports.remove = (0, _emotion.css)(_styles.colours.primaryColor, ";appearance:none;background-color:transparent;border:none;cursor:pointer;transition-property:color;transition-duration:100ms;&:focus,&:hover{color:", _styles.colours.values.error, ";}");

var removeText = /*#__PURE__*/exports.removeText = (0, _emotion.css)("display:none;");

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)(_styles.typography.fallback, ";", _styles.typography.large, ";&:hover{color:", _styles.colours.values.error, ";}");

var content = /*#__PURE__*/exports.content = (0, _emotion.css)("padding:1rem 1.5rem 0.1rem;");