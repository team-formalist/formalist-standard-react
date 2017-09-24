"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeButton = exports.spinner = exports.tagInput = exports.tagInputWrapperNoSearch = exports.tagInputWrapper = exports.popunderContainerHidden = exports.popunderContainer = exports.popunderWrapper = exports.tag = exports.tagList = exports.displayFocus = exports.display = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([fields.base], [], function createEmotionStyledRules() {
  return [{}];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([fields.baseInline], [], function createEmotionStyledRules() {
  return [{}];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([fields.header], [], function createEmotionStyledRules() {
  return [{}];
});

var display = /*#__PURE__*/exports.display = (0, _emotion.css)([_styles.inputBoxes.inputBox], [], function createEmotionStyledRules() {
  return [{
    "paddingBottom": "0.3em"
  }];
});

var displayFocus = /*#__PURE__*/exports.displayFocus = (0, _emotion.css)([_styles.inputBoxes.focus], [], function createEmotionStyledRules() {
  return [{}];
});

var tagList = /*#__PURE__*/exports.tagList = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "-webkit-box; display: -ms-flexbox; display: flex",
    "msFlexWrap": "wrap",
    "flexWrap": "wrap"
  }];
});

var tag = /*#__PURE__*/exports.tag = (0, _emotion.css)([_styles.buttons.button, _styles.buttons.normal, _styles.colours.greyMidBorder, _styles.colours.primaryColor, _styles.colours.whiteBackground], [], function createEmotionStyledRules() {
  return [{
    "marginRight": "0.5em",
    "marginBottom": "0.5em"
  }];
});

var popunderWrapper = /*#__PURE__*/exports.popunderWrapper = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "WebkitBoxFlex": "1",
    "msFlex": "1",
    "flex": "1",
    "minWidth": "200px"
  }];
});

var popunderContainer = /*#__PURE__*/exports.popunderContainer = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});

var popunderContainerHidden = /*#__PURE__*/exports.popunderContainerHidden = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "none"
  }];
});
var tagInputWrapper = /*#__PURE__*/exports.tagInputWrapper = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "position": "relative"
  }];
});
var tagInputWrapperNoSearch = /*#__PURE__*/exports.tagInputWrapperNoSearch = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "WebkitBoxFlex": "1",
    "msFlex": "1",
    "flex": "1",
    "position": "relative",
    "minWidth": "200px"
  }];
});

var tagInput = /*#__PURE__*/exports.tagInput = (0, _emotion.css)([_styles.typography.normal], [], function createEmotionStyledRules() {
  return [{
    "border": "none",
    "background": "transparent",
    "padding": "0.4em 0",
    "marginLeft": "0.5em",
    "marginBottom": "0.5em",
    "marginRight": "0.5em",
    "width": "100%",
    "&:focus": {
      "outline": "none"
    }
  }];
});

var spinner = /*#__PURE__*/exports.spinner = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "position": "absolute",
    "right": "1rem",
    "top": "0.9rem",
    "zIndex": "2"
  }];
});

var removeButton = /*#__PURE__*/exports.removeButton = (0, _emotion.css)([], [_styles.colours.values.error], function createEmotionStyledRules(x0) {
  return [{
    "display": "inline-block",
    "marginLeft": "0.4em",
    "&:focus,\n  &:hover": {
      "color": x0
    }
  }];
});