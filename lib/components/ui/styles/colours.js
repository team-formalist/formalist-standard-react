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

var whiteColor = /*#__PURE__*/exports.whiteColor = (0, _emotion.css)([], [values.white], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var whiteBackground = /*#__PURE__*/exports.whiteBackground = (0, _emotion.css)([], [values.white], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var whiteBorder = /*#__PURE__*/exports.whiteBorder = (0, _emotion.css)([], [values.white], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

/* Greys */

var greyLightColor = /*#__PURE__*/exports.greyLightColor = (0, _emotion.css)([], [values.greyLight], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var greyLightBackground = /*#__PURE__*/exports.greyLightBackground = (0, _emotion.css)([], [values.greyLight], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var greyLightBorder = /*#__PURE__*/exports.greyLightBorder = (0, _emotion.css)([], [values.greyLight], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var greyMidColor = /*#__PURE__*/exports.greyMidColor = (0, _emotion.css)([], [values.greyMid], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var greyMidBackground = /*#__PURE__*/exports.greyMidBackground = (0, _emotion.css)([], [values.greyMid], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var greyMidBorder = /*#__PURE__*/exports.greyMidBorder = (0, _emotion.css)([], [values.greyMid], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var greyTintBackground = /*#__PURE__*/exports.greyTintBackground = (0, _emotion.css)([], [values.greyTint], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var greyTintBorder = /*#__PURE__*/exports.greyTintBorder = (0, _emotion.css)([], [values.greyTint], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

/* Primary */

var primaryColor = /*#__PURE__*/exports.primaryColor = (0, _emotion.css)([], [values.primary], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var primaryBackground = /*#__PURE__*/exports.primaryBackground = (0, _emotion.css)([], [values.primary], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var primaryBorder = /*#__PURE__*/exports.primaryBorder = (0, _emotion.css)([], [values.primary], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

/* Error */
var errorColor = /*#__PURE__*/exports.errorColor = (0, _emotion.css)([], [values.error], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var errorBackground = /*#__PURE__*/exports.errorBackground = (0, _emotion.css)([], [values.error], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var errorBorder = /*#__PURE__*/exports.errorBorder = (0, _emotion.css)([], [values.error], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var errorLightBackground = /*#__PURE__*/exports.errorLightBackground = (0, _emotion.css)([], [values.errorLight], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

/* Highlight */

var highlightColor = /*#__PURE__*/exports.highlightColor = (0, _emotion.css)([], [values.highlight], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var highlightBorder = /*#__PURE__*/exports.highlightBorder = (0, _emotion.css)([], [values.highlight], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var highlightBackground = /*#__PURE__*/exports.highlightBackground = (0, _emotion.css)([], [values.highlight], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var highlightLightColor = /*#__PURE__*/exports.highlightLightColor = (0, _emotion.css)([], [values.highlightLight], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var highlightLightBorder = /*#__PURE__*/exports.highlightLightBorder = (0, _emotion.css)([], [values.highlightLight], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var highlightLightBackground = /*#__PURE__*/exports.highlightLightBackground = (0, _emotion.css)([], [values.highlightLight], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var highlightDarkColor = /*#__PURE__*/exports.highlightDarkColor = (0, _emotion.css)([], [values.highlightDark], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var highlightDarkBorder = /*#__PURE__*/exports.highlightDarkBorder = (0, _emotion.css)([], [values.highlightDark], function createEmotionStyledRules(x0) {
  return [{
    "borderColor": x0
  }];
});

var highlightDarkBackground = /*#__PURE__*/exports.highlightDarkBackground = (0, _emotion.css)([], [values.highlightDark], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

/* Blends */

var darkBlendBackground = /*#__PURE__*/exports.darkBlendBackground = (0, _emotion.css)([], [values.darkBlend], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var darkBlendColor = /*#__PURE__*/exports.darkBlendColor = (0, _emotion.css)([], [values.darkBlend], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var lightBlendBackground = /*#__PURE__*/exports.lightBlendBackground = (0, _emotion.css)([], [values.lightBlend], function createEmotionStyledRules(x0) {
  return [{
    "backgroundColor": x0
  }];
});

var lightBlendColor = /*#__PURE__*/exports.lightBlendColor = (0, _emotion.css)([], [values.lightBlend], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});