"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.align_middle__content = exports.align_middle = exports.removeX = exports.removeText = exports.remove = exports.validationMessage = exports.progress__bar = exports.progress__title = exports.listItem__title = exports.listItem__img = exports.previewItem__details = exports.previewItem = exports.listItem = exports.parent = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([fields.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([fields.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "baseInline &": {
      "paddingTop": "0"
    }
  }];
});

var parent = /*#__PURE__*/exports.parent = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "position": "relative"
  }];
});

var listItem = /*#__PURE__*/exports.listItem = (0, _emotion.css)([_styles.colours.greyLightColor, _styles.typography.small, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{
    "WebkitBoxSizing": "border-box",
    "boxSizing": "border-box",
    "position": "relative",
    "width": "100%"
  }];
});

var previewItem = /*#__PURE__*/exports.previewItem = (0, _emotion.css)([listItem], [], function createEmotionStyledRules() {
  return [{
    "background": "greyTint",
    "borderRadius": "0.25em",
    "overflow": "hidden",
    "height": "40px"
  }];
});

var previewItem__details = /*#__PURE__*/exports.previewItem__details = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "paddingLeft": "5px"
  }];
});

var listItem__img = /*#__PURE__*/exports.listItem__img = (0, _emotion.css)([], [previewItem], function createEmotionStyledRules(x0) {
  return [_defineProperty({
    "img": {
      "backgroundColor": "#fff",
      "WebkitBoxShadow": "0 2px 2px 0px rgba(0,0,0,0.08)",
      "boxShadow": "0 2px 2px 0px rgba(0,0,0,0.08)",
      "WebkitBoxSizing": "border-box",
      "boxSizing": "border-box",
      "display": "inline-block",
      "height": "40px",
      "marginRight": "20px",
      "padding": "2px",
      "width": "auto",
      "position": "relative",
      "zIndex": "2"
    }
  }, "." + x0 + " &", {
    "img": {
      "height": "30px"
    }
  })];
});

var listItem__title = /*#__PURE__*/exports.listItem__title = (0, _emotion.css)([_styles.typography.lineHeightNormal], [_styles.colours.value.highlight], function createEmotionStyledRules(x0) {
  return [{
    "overflow": "hidden",
    "whiteSpace": "nowrap",
    "lineHeight": "40px",
    "a": {
      "color": x0
    }
  }];
});

var progress__title = /*#__PURE__*/exports.progress__title = (0, _emotion.css)([listItem__title], [_styles.colours.values.white], function createEmotionStyledRules(x0) {
  return [{
    "color": x0
  }];
});

var progress__bar = /*#__PURE__*/exports.progress__bar = (0, _emotion.css)([], [_styles.colours.highlightBackground], function createEmotionStyledRules(x0) {
  return [{
    "compose": "0",
    "left": "0",
    "WebkitBoxSizing": "border-box",
    "boxSizing": "border-box",
    "position": "absolute",
    "top": "0",
    "WebkitTransition": "width 0.5s ease-in-out",
    "transition": "width 0.5s ease-in-out",
    "width": "0",
    "zIndex": "1",
    "overflow": "hidden"
  }];
});

var validationMessage = /*#__PURE__*/exports.validationMessage = (0, _emotion.css)([_styles.typography.sans, _styles.typography.normal, _styles.colours.errorColor, _styles.colours.errorLightBackground], [], function createEmotionStyledRules() {
  return [{
    "marginBottom": "5px",
    "padding": "8px 50px 8px 8px",
    "position": "relative",
    "zIndex": "1"
  }];
});

var remove = /*#__PURE__*/exports.remove = (0, _emotion.css)([_styles.colours.primaryColor], [_styles.colours.values.error], function createEmotionStyledRules(x0) {
  return [{
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    "appearance": "none",
    "backgroundColor": "transparent",
    "border": "none",
    "cursor": "pointer",
    "padding": "1rem",
    "position": "absolute",
    "right": "10px",
    "top": "50%",
    "WebkitTransform": "translateY(-50%)",
    "transform": "translateY(-50%)",
    "WebkitTransitionDuration": "100ms",
    "transitionDuration": "100ms",
    "WebkitTransitionProperty": "color",
    "transitionProperty": "color",
    "zIndex": "2",
    "&:focus,\n  &:hover": {
      "color": x0
    }
  }];
});

var removeText = /*#__PURE__*/exports.removeText = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "none"
  }];
});

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)([_styles.typography.fallback, _styles.typography.large], [_styles.colours.values.error], function createEmotionStyledRules(x0) {
  return [{
    "&:hover": {
      "color": x0
    }
  }];
});

var align_middle = /*#__PURE__*/exports.align_middle = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "table"
  }];
});

var align_middle__content = /*#__PURE__*/exports.align_middle__content = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "table-cell",
    "verticalAlign": "middle",
    "marginTop": "-2px"
  }];
});