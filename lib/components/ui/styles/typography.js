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

var sans = /*#__PURE__*/exports.sans = (0, _emotion.css)([], [fonts.families.sans], function createEmotionStyledRules(x0) {
  return [{
    "fontFamily": x0
  }];
});

var sansBold = /*#__PURE__*/exports.sansBold = (0, _emotion.css)([sans], [fonts.weights.sansBold], function createEmotionStyledRules(x0) {
  return [{
    "fontWeight": x0
  }];
});

/**
 * Monospace: Inconsolata
 */

var mono = /*#__PURE__*/exports.mono = (0, _emotion.css)([], [fonts.families.mono], function createEmotionStyledRules(x0) {
  return [{
    "fontFamily": x0
  }];
});

/**
 * Monospace: Inconsolata
 */

var fallback = /*#__PURE__*/exports.fallback = (0, _emotion.css)([], [fonts.families.fallback], function createEmotionStyledRules(x0) {
  return [{
    "fontFamily": x0
  }];
});

/* Line height */

var lineHeightNormal = /*#__PURE__*/exports.lineHeightNormal = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "lineHeight": "1.3"
  }];
});

/* Sizes */
var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)([], [fonts.sizes.xSmall], function createEmotionStyledRules(x0) {
  return [{
    "fontSize": x0
  }];
});

var small = /*#__PURE__*/exports.small = (0, _emotion.css)([], [fonts.sizes.small], function createEmotionStyledRules(x0) {
  return [{
    "fontSize": x0
  }];
});

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)([], [fonts.sizes.normal], function createEmotionStyledRules(x0) {
  return [{
    "fontSize": x0
  }];
});

var large = /*#__PURE__*/exports.large = (0, _emotion.css)([], [fonts.sizes.large], function createEmotionStyledRules(x0) {
  return [{
    "fontSize": x0
  }];
});

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)([], [fonts.sizes.xLarge], function createEmotionStyledRules(x0) {
  return [{
    "fontSize": x0
  }];
});

/* Misc */
var uppercase = /*#__PURE__*/exports.uppercase = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "textTransform": "uppercase"
  }];
});

/* Headers */

var headerSmallCaps = /*#__PURE__*/exports.headerSmallCaps = (0, _emotion.css)([sansBold, xsmall, uppercase], [], function createEmotionStyledRules() {
  return [{
    "letterSpacing": "0.12em"
  }];
});