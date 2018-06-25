import { css } from "emotion";

export var fonts = {
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

export var sans = /*#__PURE__*/css("font-family:", fonts.families.sans, ";");

export var sansBold = /*#__PURE__*/css(sans, ";font-weight:", fonts.weights.sansBold, ";");

/**
 * Monospace: Inconsolata
 */

export var mono = /*#__PURE__*/css("font-family:", fonts.families.mono, ";");

/**
 * Monospace: Inconsolata
 */

export var fallback = /*#__PURE__*/css("font-family:", fonts.families.fallback, ";");

/* Line height */

export var lineHeightNormal = /*#__PURE__*/css("line-height:1.3;");

/* Sizes */
export var xsmall = /*#__PURE__*/css("font-size:", fonts.sizes.xSmall, ";");

export var small = /*#__PURE__*/css("font-size:", fonts.sizes.small, ";");

export var normal = /*#__PURE__*/css("font-size:", fonts.sizes.normal, ";");

export var large = /*#__PURE__*/css("font-size:", fonts.sizes.large, ";");

export var xlarge = /*#__PURE__*/css("font-size:", fonts.sizes.xLarge, ";");

/* Misc */
export var uppercase = /*#__PURE__*/css("text-transform:uppercase;");

/* Headers */

export var headerSmallCaps = /*#__PURE__*/css(sansBold, ";", xsmall, ";", uppercase, ";letter-spacing:0.12em;");