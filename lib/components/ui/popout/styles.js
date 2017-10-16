"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containerArrowBottom = exports.containerArrowTop = exports.containerArrowRight = exports.containerArrowLeft = exports.containerArrow = exports.containerBottom = exports.containerTop = exports.containerRight = exports.containerLeft = exports.container = exports.positioner = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var positioner = /*#__PURE__*/exports.positioner = (0, _emotion.css)("position:absolute;height:0;width:0;z-index:10000;");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";", _styles.colours.whiteBackground, ";", _styles.popovers.popover, ";border-radius:3px;position:absolute;");

var containerLeft = /*#__PURE__*/exports.containerLeft = (0, _emotion.css)("right:0;top:0;");

var containerRight = /*#__PURE__*/exports.containerRight = (0, _emotion.css)("left:0;top:0;");

var containerTop = /*#__PURE__*/exports.containerTop = (0, _emotion.css)("bottom:0;left:0;transform:translateX(-50%);");

var containerBottom = /*#__PURE__*/exports.containerBottom = (0, _emotion.css)("top:0;left:0;transform:translateX(-50%);");

/**
 * Arrow is separate to avoid overflow issues
 */
var containerArrow = /*#__PURE__*/exports.containerArrow = (0, _emotion.css)("bottom:0;left:0;position:absolute;right:0;top:0;z-index:1;&:after,&:before{border-color:transparent;border:solid transparent;content:\" \";height:0;width:0;position:absolute;pointer-events:none;}");

var containerArrowLeft = /*#__PURE__*/exports.containerArrowLeft = (0, _emotion.css)("left:-1px;top:1.2rem;&:before{border-left-color:", _styles.colours.values.greyLight, ";border-width:6px;margin-top:-1px;}&:after{border-left-color:", _styles.colours.values.white, ";border-width:5px;}");

var containerArrowRight = /*#__PURE__*/exports.containerArrowRight = (0, _emotion.css)("top:1.2rem;margin-left:-9px;&:before{border-right-color:", _styles.colours.values.greyLight, ";border-width:6px;margin-left:-2px;margin-top:-1px;}&:after{border-right-color:", _styles.colours.values.white, ";border-width:5px;}");

var containerArrowTop = /*#__PURE__*/exports.containerArrowTop = (0, _emotion.css)("margin-top:-1px;left:50%;top:100%;&:before{border-top-color:", _styles.colours.values.greyLight, ";border-width:6px;margin-left:-6px;}&:after{border-top-color:", _styles.colours.values.white, ";border-width:5px;margin-left:-5px;}");

var containerArrowBottom = /*#__PURE__*/exports.containerArrowBottom = (0, _emotion.css)("bottom:100%;left:50%;top:-11px;&:before{border-bottom-color:", _styles.colours.values.greyLight, ";border-width:6px;margin-left:-6px;}&:after{border-bottom-color:", _styles.colours.values.white, ";border-width:6px;margin-left:-6px;margin-top:2px;}");