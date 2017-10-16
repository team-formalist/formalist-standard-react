"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.content = exports.overlay = exports.closeX = exports.closeText = exports.close = exports.container = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)("bottom:0;left:0;overflow-scroll:touch;overflow-y:scroll;position:fixed;right:0;top:0;z-index:10000;");

var close = /*#__PURE__*/exports.close = (0, _emotion.css)("background-color:transparent;border:none;cursor:pointer;position:fixed;right:0;top:0;z-index:3;");

var closeText = /*#__PURE__*/exports.closeText = (0, _emotion.css)("display:none;");
var closeX = /*#__PURE__*/exports.closeX = (0, _emotion.css)(_styles.typography.fallback, ";", _styles.typography.large, ";", _styles.colours.primaryColor, ";cursor:pointer;padding:1rem;&:hover{color:error;}");

var overlay = /*#__PURE__*/exports.overlay = (0, _emotion.css)(_styles.colours.lightBlendBackground, ";border:none;bottom:0;height:100%;left:0;position:fixed;right:0;top:0;width:100%;z-index:1;");

var content = /*#__PURE__*/exports.content = (0, _emotion.css)("position:relative;z-index:2;max-width:300px;margin:0 auto;");