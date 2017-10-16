"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropzone__button = exports.dropzone__label = exports.dropzone__disable_hover = exports.dropzone__active = exports.dropzone__label__wrapper = exports.dropzone__drag_over = exports.dropzone__empty = exports.dropzone = undefined;

var _templateObject = _taggedTemplateLiteral([""], [""]);

var _emotion = require("emotion");

var _styles = require("../styles");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

/**
 * dropzone
 * this element cannot always be positioned relative.
 * when this field is 'relative' it's sortable children "lose" elements when dragging.
 * This element does need to be 'relative' at times to display it's label element
 * vertically aligned.
 * When the dropzone is empty, or on window drag, we position this element 'relative'
 */

var dropzone = exports.dropzone = /*#__PURE__*/(0, _emotion.css)([_styles.colours.greyLightColor, _styles.typography.small, _styles.typography.sans], [], function createEmotionStyledRules() {
  return [{
    "minHeight": "71px",
    "WebkitTransition": "background-color 0.3s",
    "transition": "background-color 0.3s",
    "width": "100%",
    "zIndex": "1",
    "&:hover": {
      "cursor": "pointer"
    }
  }];
})(_templateObject);

var dropzone__empty = /*#__PURE__*/exports.dropzone__empty = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "position": "relative"
  }];
});
var dropzone__drag_over = /*#__PURE__*/exports.dropzone__drag_over = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    "position": "relative",
    "> div": {
      "opacity": "0"
    }
  }];
});

/**
 * dropzone__label__wrapper
 * This is the coloured block that hides existing uploaded files.
 * We only show this when dragging files on the window or when the dropzone
 * is empty.
 */

/* add a psuedo element with the dash border *behind* the label so
that it doesn't glitchy state changes when hovered/dragged over */

var dropzone__label__wrapper = /*#__PURE__*/exports.dropzone__label__wrapper = (0, _emotion.css)([], [_styles.colours.values.greyLight, dropzone__disable_hover, dropzone__active, dropzone__disable_hover, dropzone__drag_over, dropzone__active, dropzone__drag_over, dropzone__active, dropzone__empty, dropzone__empty, dropzone__empty, _styles.colours.values.greyMid, dropzone__drag_over, _styles.colours.values.greyMid, dropzone__disable_hover, dropzone__drag_over, dropzone__active, dropzone__drag_over, dropzone__active, _styles.colours.values.highlight], function createEmotionStyledRules(x0, x1, x2, x3, x4, x5, x6, x7, x8, x9, x10, x11, x12, x13, x14, x15, x16, x17, x18, x19) {
  var _ref;

  return [(_ref = {
    "background": "transparent",
    "bottom": "0",
    "display": "none",
    "left": "0",
    "position": "absolute",
    "right": "0",
    "top": "0",
    "width": "100%",
    "zIndex": "-1",
    "&:after": {
      "backgroundColor": "transparent",
      "border": "1px dashed " + x0,
      "bottom": "0",
      "WebkitBoxSizing": "border-box",
      "boxSizing": "border-box",
      "content": "\"\"",
      "display": "block",
      "left": "0",
      "position": "absolute",
      "right": "0",
      "top": "0",
      "zIndex": "-2"
    }
  }, _defineProperty(_ref, "." + x1 + "." + x2 + ":hover &", {
    "display": "none"
  }), _defineProperty(_ref, "." + x3 + "." + x4 + "." + x5 + ":hover &,\n  ." + x6 + " &,\n  ." + x7 + " &,\n  ." + x8 + " &", {
    "display": "block"
  }), _defineProperty(_ref, "// Empty\n  ." + x9 + " &", {
    "backgroundColor": "transparent"
  }), _defineProperty(_ref, "." + x10 + ":hover &", {
    "&:after": {
      "borderColor": x11
    }
  }), _defineProperty(_ref, "// Dragging\n  ." + x12 + " &", {
    "background": "rgba(245,245,245, 0.7)",
    "&:after": {
      "borderColor": x13
    }
  }), _defineProperty(_ref, "// Dragging on the window and then over the dropzone state\n  ." + x14 + "." + x15 + "." + x16 + " &,\n  ." + x17 + "." + x18 + " &", {
    "background": "rgba(127,194,234, 0.3)",
    "&:after,\n    &:after": {
      "borderColor": x19
    }
  }), _ref)];
});

var dropzone__active = /*#__PURE__*/exports.dropzone__active = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});
var dropzone__disable_hover = /*#__PURE__*/exports.dropzone__disable_hover = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{}];
});

/**
 * dropzone__label
 * visibility of this element is dictated by dropzone__label__wrapper
 */

var dropzone__label = /*#__PURE__*/exports.dropzone__label = (0, _emotion.css)([_styles.colours.greyLightColor], [dropzone__empty, _styles.colours.values.greyMid, dropzone__drag_over, dropzone__active, dropzone__empty, _styles.colours.values.highlight, dropzone__drag_over, _styles.colours.values.greyMid], function createEmotionStyledRules(x0, x1, x2, x3, x4, x5, x6, x7) {
  var _ref2;

  return [(_ref2 = {
    "display": "inline-block",
    "left": "50%",
    "position": "absolute",
    "top": "50%",
    "WebkitTransform": "translateX(-50%) translateY(-50%)",
    "transform": "translateX(-50%) translateY(-50%)",
    "WebkitTransition": "color 0.25s",
    "transition": "color 0.25s",
    "zIndex": "1"
  }, _defineProperty(_ref2, "." + x0 + " &", {
    "&:hover": {
      "color": x1
    }
  }), _defineProperty(_ref2, "." + x2 + "." + x3 + ",\n  ." + x4 + " &", {
    "color": x5
  }), _defineProperty(_ref2, "." + x6 + " &", {
    "color": x7
  }), _ref2)];
});

/**
 * dropzone button
 * This button is positioned inside of the multi-upload-field component.
 * Because the multi-upload-field cannot be positioned 'relative' by default
 * (due to Sortable Items losing elements on drag) we have to float this to
 * the right and apply negative margin to position it in the multi-upload-field
 * field header
 */

var dropzone__button = /*#__PURE__*/exports.dropzone__button = (0, _emotion.css)([_styles.buttons.small, _styles.buttons.buttonHighlight], [], function createEmotionStyledRules() {
  return [{
    "float": "right",
    "marginTop": "-3.4rem"
  }];
});