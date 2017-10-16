"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lightBlendColor = exports.lightBlendBackground = exports.darkBlendColor = exports.darkBlendBackground = exports.highlightDarkBackground = exports.highlightDarkBorder = exports.highlightDarkColor = exports.highlightLightBackground = exports.highlightLightBorder = exports.highlightLightColor = exports.highlightBackground = exports.highlightBorder = exports.highlightColor = exports.errorLightBackground = exports.errorBorder = exports.errorBackground = exports.errorColor = exports.primaryBorder = exports.primaryBackground = exports.primaryColor = exports.greyTintBorder = exports.greyTintBackground = exports.greyMidBorder = exports.greyMidBackground = exports.greyMidColor = exports.greyLightBorder = exports.greyLightBackground = exports.greyLightColor = exports.whiteBorder = exports.whiteBackground = exports.whiteColor = exports.values = undefined;

var _emotion = require("emotion");

var values = exports.values = {
  white: "#fff",
  greyLight: "#ccc",
  greyMid: "#999",
  greyTint: "#f1f1f1",
  primary: "#333",
  error: "#eb4d5c",
  errorLight: "#fff4f5",
  highlight: "#7fc2ea",
  highlightLight: "#dff1fc",
  highlightDark: "#3980ab",
  darkBlend: "rgba(0,0,0,0.9)",
  lightBlend: "rgba(0,0,0,0.2)"
};

var whiteColor = /*#__PURE__*/exports.whiteColor = (0, _emotion.css)("color:", values.white, ";");

var whiteBackground = /*#__PURE__*/exports.whiteBackground = (0, _emotion.css)("background-color:", values.white, ";");

var whiteBorder = /*#__PURE__*/exports.whiteBorder = (0, _emotion.css)("border-color:", values.white, ";");

/* Greys */

var greyLightColor = /*#__PURE__*/exports.greyLightColor = (0, _emotion.css)("color:", values.greyLight, ";");

var greyLightBackground = /*#__PURE__*/exports.greyLightBackground = (0, _emotion.css)("background-color:", values.greyLight, ";");

var greyLightBorder = /*#__PURE__*/exports.greyLightBorder = (0, _emotion.css)("border-color:", values.greyLight, ";");

var greyMidColor = /*#__PURE__*/exports.greyMidColor = (0, _emotion.css)("color:", values.greyMid, ";");

var greyMidBackground = /*#__PURE__*/exports.greyMidBackground = (0, _emotion.css)("background-color:", values.greyMid, ";");

var greyMidBorder = /*#__PURE__*/exports.greyMidBorder = (0, _emotion.css)("border-color:", values.greyMid, ";");

var greyTintBackground = /*#__PURE__*/exports.greyTintBackground = (0, _emotion.css)("background-color:", values.greyTint, ";");

var greyTintBorder = /*#__PURE__*/exports.greyTintBorder = (0, _emotion.css)("border-color:", values.greyTint, ";");

/* Primary */

var primaryColor = /*#__PURE__*/exports.primaryColor = (0, _emotion.css)("color:", values.primary, ";");

var primaryBackground = /*#__PURE__*/exports.primaryBackground = (0, _emotion.css)("background-color:", values.primary, ";");

var primaryBorder = /*#__PURE__*/exports.primaryBorder = (0, _emotion.css)("border-color:", values.primary, ";");

/* Error */
var errorColor = /*#__PURE__*/exports.errorColor = (0, _emotion.css)("color:", values.error, ";");

var errorBackground = /*#__PURE__*/exports.errorBackground = (0, _emotion.css)("background-color:", values.error, ";");

var errorBorder = /*#__PURE__*/exports.errorBorder = (0, _emotion.css)("border-color:", values.error, ";");

var errorLightBackground = /*#__PURE__*/exports.errorLightBackground = (0, _emotion.css)("background-color:", values.errorLight, ";");

/* Highlight */

var highlightColor = /*#__PURE__*/exports.highlightColor = (0, _emotion.css)("color:", values.highlight, ";");

var highlightBorder = /*#__PURE__*/exports.highlightBorder = (0, _emotion.css)("border-color:", values.highlight, ";");

var highlightBackground = /*#__PURE__*/exports.highlightBackground = (0, _emotion.css)("background-color:", values.highlight, ";");

var highlightLightColor = /*#__PURE__*/exports.highlightLightColor = (0, _emotion.css)("color:", values.highlightLight, ";");

var highlightLightBorder = /*#__PURE__*/exports.highlightLightBorder = (0, _emotion.css)("border-color:", values.highlightLight, ";");

var highlightLightBackground = /*#__PURE__*/exports.highlightLightBackground = (0, _emotion.css)("background-color:", values.highlightLight, ";");

var highlightDarkColor = /*#__PURE__*/exports.highlightDarkColor = (0, _emotion.css)("color:", values.highlightDark, ";");

var highlightDarkBorder = /*#__PURE__*/exports.highlightDarkBorder = (0, _emotion.css)("border-color:", values.highlightDark, ";");

var highlightDarkBackground = /*#__PURE__*/exports.highlightDarkBackground = (0, _emotion.css)("background-color:", values.highlightDark, ";");

/* Blends */

var darkBlendBackground = /*#__PURE__*/exports.darkBlendBackground = (0, _emotion.css)("background-color:", values.darkBlend, ";");

var darkBlendColor = /*#__PURE__*/exports.darkBlendColor = (0, _emotion.css)("color:", values.darkBlend, ";");

var lightBlendBackground = /*#__PURE__*/exports.lightBlendBackground = (0, _emotion.css)("background-color:", values.lightBlend, ";");

var lightBlendColor = /*#__PURE__*/exports.lightBlendColor = (0, _emotion.css)("color:", values.lightBlend, ";");