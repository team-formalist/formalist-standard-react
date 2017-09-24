"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selection = exports.optionButton = exports.search = exports.noResults = exports.optionsList = exports.options = exports.removeX = exports.removeText = exports.remove = exports.openSelectorButton = exports.selectionPlaceholder = exports.selectionItems = exports.wrapper = exports.display = exports.header = exports.baseInline = exports.base = undefined;

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

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "baseInline &": {
      "paddingTop": "0"
    }
  }];
});

var display = /*#__PURE__*/exports.display = (0, _emotion.css)([_styles.inputBoxes.inputBox], [], function createEmotionStyledRules() {
  return [{}];
});

var wrapper = /*#__PURE__*/exports.wrapper = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "WebkitBoxAlign": "center",
    "msFlexAlign": "center",
    "alignItems": "center",
    "display": "-webkit-box; display: -ms-flexbox; display: flex",
    "padding": "0",
    "width": "100%",
    "&:focus": {
      "outline": "none"
    }
  }];
});

var selectionItems = /*#__PURE__*/exports.selectionItems = (0, _emotion.css)([_styles.typography.normal, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{
    "marginTop": "1px"
  }];
});

var selectionPlaceholder = /*#__PURE__*/exports.selectionPlaceholder = (0, _emotion.css)([_styles.colours.greyMidColor, _styles.typography.normal, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{
    "WebkitBoxAlign": "center",
    "msFlexAlign": "center",
    "alignItems": "center",
    "display": "-webkit-box; display: -ms-flexbox; display: flex",
    "WebkitBoxFlex": "1",
    "msFlex": "1",
    "flex": "1",
    "textAlign": "left",
    "minHeight": "2rem"
  }];
});

var openSelectorButton = /*#__PURE__*/exports.openSelectorButton = (0, _emotion.css)([_styles.buttons.small, _styles.buttons.buttonHighlight], [], function createEmotionStyledRules() {
  return [{
    "marginRight": "-0.3rem",
    "marginTop": "-0.2rem",
    "marginBottom": "-0.4rem"
  }];
});

/* Selection exists */

var remove = /*#__PURE__*/exports.remove = (0, _emotion.css)([_styles.colours.primaryColor], [_styles.colours.values.error], function createEmotionStyledRules(x0) {
  return [{
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    "appearance": "none",
    "backgroundColor": "transparent",
    "border": "none",
    "cursor": "pointer",
    "padding": "0.17em",
    "marginTop": "-0.3rem",
    "marginBottom": "-0.3rem",
    "WebkitTransitionProperty": "color",
    "transitionProperty": "color",
    "WebkitTransitionDuration": "100ms",
    "transitionDuration": "100ms",
    "&:focus,\n  &:hover": {
      "colour": x0
    }
  }];
});

var removeText = /*#__PURE__*/exports.removeText = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "display": "none"
  }];
});

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)([_styles.typography.fallback, _styles.typography.large], [], function createEmotionStyledRules() {
  return [{}];
});

/**
 * Selections
 */

var options = /*#__PURE__*/exports.options = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "minWidth": "30rem"
  }];
});

var optionsList = /*#__PURE__*/exports.optionsList = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "maxHeight": "40rem",
    "overflowY": "scroll",
    "overflowScroll": "touch",
    "paddingTop": "0.5rem"
  }];
});

var noResults = /*#__PURE__*/exports.noResults = (0, _emotion.css)([_styles.typography.normal, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{
    "padding": "0.5em 1rem 0.7em"
  }];
});

var search = /*#__PURE__*/exports.search = (0, _emotion.css)([_styles.typography.normal, _styles.typography.sans, _styles.colours.greyTintBorder], [], function createEmotionStyledRules() {
  return [{
    "WebkitAppearance": "none",
    "MozAppearance": "none",
    "appearance": "none",
    "borderWidth": "0",
    "borderBottomWidth": "1px",
    "borderBottomStyle": "solid",
    "WebkitBoxSizing": "border-box",
    "boxSizing": "border-box",
    "WebkitBoxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.02)",
    "boxShadow": "0 2px 0 0 rgba(0, 0, 0, 0.02)",
    "padding": "0.5em 0.5em 0.7em 0.5em",
    "position": "relative",
    "width": "100%",
    "zIndex": "1",
    "&:focus": {
      "outline": "none"
    }
  }];
});

var optionButton = /*#__PURE__*/exports.optionButton = (0, _emotion.css)([_styles.typography.normal, _styles.typography.sans, _styles.colours.greyTintBorder, _styles.colours.whiteBackground], [_styles.typography.fonts.weights.sansBold], function createEmotionStyledRules(x0) {
  return [{
    "borderWidth": "0",
    "borderBottomWidth": "1px",
    "borderStyle": "solid",
    "cursor": "pointer",
    "display": "block",
    "padding": "0.7rem 1rem",
    "textAlign": "left",
    "width": "100%",
    "&:hover": {
      "textDecoration": "underline"
    },
    "strong": {
      "fontWeight": x0
    },
    "italic": {
      "fontStyle": "italic"
    }
  }];
});

var selection = /*#__PURE__*/exports.selection = (0, _emotion.css)([], [_styles.typography.fonts.weights.sansBold], function createEmotionStyledRules(x0) {
  return [{
    "strong": {
      "fontWeight": x0
    },
    "italic": {
      "fontStyle": "italic"
    }
  }];
});