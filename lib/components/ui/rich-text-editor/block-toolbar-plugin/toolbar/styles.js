"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buttonsWrapper = exports.toggleText = exports.toggle = exports.iconWrapper = exports.positioner = undefined;

var _emotion = require("emotion");

var _styles = require("../../../styles");

var positioner = /*#__PURE__*/exports.positioner = (0, _emotion.css)("left:50%;position:absolute;transform:translate(-50%,0);top:1.1rem;transition-property:top;transition-duration:50ms;width:0;");

var iconWrapper = /*#__PURE__*/exports.iconWrapper = (0, _emotion.css)("align-items:center;display:flex;fill:", _styles.colours.values.greyMid, ";height:16px;width:16px;margin-left:auto;margin-right:auto;svg{margin-left:auto;margin-right:auto;}");

var toggle = /*#__PURE__*/exports.toggle = (0, _emotion.css)(_styles.colours.greyMidColor, ";padding:1rem 1.4rem 1rem 0.9rem;position:relative;transform:translate(-50%,0);&:hover,&:hover:after{color:", _styles.colours.values.highlight, ";border-top-color:", _styles.colours.values.highlight, ";}&:after{top:50%;right:0.3rem;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none;border-color:transparent;border-top-color:", _styles.colours.values.greyLight, ";border-width:0.3em;margin-left:-0.3em;margin-top:-0.1em;}");

var toggleText = /*#__PURE__*/exports.toggleText = (0, _emotion.css)("display:none;");

var buttonsWrapper = /*#__PURE__*/exports.buttonsWrapper = (0, _emotion.css)("display:flex;");