"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropzone__button = exports.dropzone__label = exports.dropzone__disable_hover = exports.dropzone__active = exports.dropzone__label__wrapper = exports.dropzone__drag_over = exports.dropzone__empty = exports.dropzone = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

/**
 * dropzone
 * this element cannot always be positioned relative.
 * when this field is 'relative' it's sortable children "lose" elements when dragging.
 * This element does need to be 'relative' at times to display it's label element
 * vertically aligned.
 * When the dropzone is empty, or on window drag, we position this element 'relative'
 */

var dropzone = /*#__PURE__*/exports.dropzone = (0, _emotion.css)("composes:", _styles.colours.greyLightColor, " ", _styles.typography.small, " ", _styles.typography.sans, ";min-height:71px;transition:background-color 0.3s;width:100%;z-index:1;&:hover{cursor:pointer;}");

var dropzone__empty = /*#__PURE__*/exports.dropzone__empty = (0, _emotion.css)("position:relative;");
var dropzone__drag_over = /*#__PURE__*/exports.dropzone__drag_over = (0, _emotion.css)("position:relative;> div{opacity:0;}");

/**
 * dropzone__label__wrapper
 * This is the coloured block that hides existing uploaded files.
 * We only show this when dragging files on the window or when the dropzone
 * is empty.
 */

/* add a psuedo element with the dash border *behind* the label so
that it doesn't glitchy state changes when hovered/dragged over */

var dropzone__label__wrapper = /*#__PURE__*/exports.dropzone__label__wrapper = (0, _emotion.css)("background:transparent;bottom:0;display:none;left:0;position:absolute;right:0;top:0;width:100%;z-index:-1;&:after{background-color:transparent;border:1px dashed ", _styles.colours.values.greyLight, ";bottom:0;box-sizing:border-box;content:\"\";display:block;left:0;position:absolute;right:0;top:0;z-index:-2;}.", dropzone__disable_hover, ".", dropzone__active, ":hover &{display:none;}.", dropzone__disable_hover, ".", dropzone__drag_over, ".", dropzone__active, ":hover &,.", dropzone__drag_over, " &,.", dropzone__active, " &,.", dropzone__empty, " &{display:block;}// Empty\n  .", dropzone__empty, " &{background-color:transparent;}.", dropzone__empty, ":hover &{&:after{border-color:", _styles.colours.values.greyMid, ";}}// Dragging\n  .", dropzone__drag_over, " &{background:rgba(245,245,245,0.7);&:after{border-color:", _styles.colours.values.greyMid, ";}}// Dragging on the window and then over the dropzone state\n  .", dropzone__disable_hover, ".", dropzone__drag_over, ".", dropzone__active, " &,.", dropzone__drag_over, ".", dropzone__active, " &{background:rgba(127,194,234,0.3);&:after,&:after{border-color:", _styles.colours.values.highlight, ";}}");

var dropzone__active = /*#__PURE__*/exports.dropzone__active = (0, _emotion.css)();
var dropzone__disable_hover = /*#__PURE__*/exports.dropzone__disable_hover = (0, _emotion.css)();

/**
 * dropzone__label
 * visibility of this element is dictated by dropzone__label__wrapper
 */

var dropzone__label = /*#__PURE__*/exports.dropzone__label = (0, _emotion.css)("composes:", _styles.colours.greyLightColor, ";display:inline-block;left:50%;position:absolute;top:50%;transform:translateX(-50%) translateY(-50%);transition:color 0.25s;z-index:1;.", dropzone__empty, " &{&:hover{color:", _styles.colours.values.greyMid, ";}}.", dropzone__drag_over, ".", dropzone__active, ",.", dropzone__empty, " &{color:", _styles.colours.values.highlight, ";}.", dropzone__drag_over, " &{color:", _styles.colours.values.greyMid, ";}");

/**
 * dropzone button
 * This button is positioned inside of the multi-upload-field component.
 * Because the multi-upload-field cannot be positioned 'relative' by default
 * (due to Sortable Items losing elements on drag) we have to float this to
 * the right and apply negative margin to position it in the multi-upload-field
 * field header
 */

var dropzone__button = /*#__PURE__*/exports.dropzone__button = (0, _emotion.css)("composes:", _styles.buttons.small, " ", _styles.buttons.buttonHighlight, ";float:right;margin-top:-3.4rem;");