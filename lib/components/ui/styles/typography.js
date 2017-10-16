"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.headerSmallCaps = exports.uppercase = exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.lineHeightNormal = exports.fallback = exports.mono = exports.sansBold = exports.sans = exports.fonts = undefined;

var _emotion = require("emotion");

var fonts = exports.fonts = {
  families: {
    sans: "'Work Sans', 'Helvetica', sans-serif",
    mono: "'Inconsolata', monospace",
    fallback: "'Helvetica', sans-serif"
  },
  weights: {
    sansBold: "700"
  },
  sizes: {
    xSmall: "1.1rem",
    small: "1.3rem",
    normal: "1.4rem",
    large: "1.8rem",
    xLarge: "2rem"
  }
};

var sans = /*#__PURE__*/exports.sans = (0, _emotion.css)("font-family:", fonts.families.sans, ";");

var sansBold = /*#__PURE__*/exports.sansBold = (0, _emotion.css)(sans, ";font-weight:", fonts.weights.sansBold, ";");

/**
 * Monospace: Inconsolata
 */

var mono = /*#__PURE__*/exports.mono = (0, _emotion.css)("font-family:", fonts.families.mono, ";");

/**
 * Monospace: Inconsolata
 */

var fallback = /*#__PURE__*/exports.fallback = (0, _emotion.css)("font-family:", fonts.families.fallback, ";");

/* Line height */

var lineHeightNormal = /*#__PURE__*/exports.lineHeightNormal = (0, _emotion.css)("line-height:1.3;");

/* Sizes */
var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)("font-size:", fonts.sizes.xSmall, ";");

var small = /*#__PURE__*/exports.small = (0, _emotion.css)("font-size:", fonts.sizes.small, ";");

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)("font-size:", fonts.sizes.normal, ";");

var large = /*#__PURE__*/exports.large = (0, _emotion.css)("font-size:", fonts.sizes.large, ";");

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)("font-size:", fonts.sizes.xLarge, ";");

/* Misc */
var uppercase = /*#__PURE__*/exports.uppercase = (0, _emotion.css)("text-transform:uppercase;");

/* Headers */

var headerSmallCaps = /*#__PURE__*/exports.headerSmallCaps = (0, _emotion.css)(sansBold, ";", xsmall, ";", uppercase, ";letter-spacing:0.12em");