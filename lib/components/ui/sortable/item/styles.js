"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeX = exports.handleLine = exports.removeText = exports.handleText = exports.remove = exports.handle = exports.controlsVertical = exports.controls = exports.inner = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)(_styles.colours.whiteBackground, ";", _styles.colours.greyLightBorder, ";border-style:solid;border-width:1px;display:flex;margin:-1px;padding:0.5rem 1rem;");

var inner = /*#__PURE__*/exports.inner = (0, _emotion.css)("align-items:center;display:flex;flex:1;margin-right:1rem;");

var controls = /*#__PURE__*/exports.controls = (0, _emotion.css)("align-items:center;display:flex;");

var controlsVertical = /*#__PURE__*/exports.controlsVertical = (0, _emotion.css)("align-self:flex-start;flex-direction:column;");

var handle = /*#__PURE__*/exports.handle = (0, _emotion.css)(_styles.colours.primaryColor, ";appearance:none;background-color:transparent;border:none;cursor:pointer;padding:1rem;transition-property:color;transition-duration:100ms;position:relative;&:focus{outline:none;}&:hover,&:focus{color:", _styles.colours.values.error, ";}");
var remove = exports.remove = handle;

var handleText = /*#__PURE__*/exports.handleText = (0, _emotion.css)("display:none;");
var removeText = exports.removeText = handleText;

var handleLine = /*#__PURE__*/exports.handleLine = (0, _emotion.css)("background-color:currentColor;border-radius:0.3rem;height:0.2rem;margin-top:0.2rem;position:relative;width:1.4rem;&:before,&:after{background-color:currentColor;border-radius:0.3rem;content:'';height:0.2rem;left:0;position:absolute;right:0;}&:before{margin-top:-0.4rem;}&:after{margin-top:0.4rem;}");

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)(_styles.typography.fallback, ";", _styles.typography.large, ";&:hover{color:", _styles.colours.values.error, ";}");