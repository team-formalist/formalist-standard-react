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

var base = /*#__PURE__*/exports.base = (0, _emotion.css)(fields.base, ";");

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)(fields.baseInline, ";");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)(fields.header, ";");

var display = /*#__PURE__*/exports.display = (0, _emotion.css)(_styles.inputBoxes.inputBox, ";padding-bottom:0.3em;");

var displayFocus = /*#__PURE__*/exports.displayFocus = (0, _emotion.css)(_styles.inputBoxes.focus, ";");

var tagList = /*#__PURE__*/exports.tagList = (0, _emotion.css)("display:flex;flex-wrap:wrap;");

var tag = /*#__PURE__*/exports.tag = (0, _emotion.css)(_styles.buttons.button, ";", _styles.buttons.normal, ";", _styles.colours.greyMidBorder, ";", _styles.colours.primaryColor, ";", _styles.colours.whiteBackground, ";margin-right:0.5em;margin-bottom:0.5em;");

var popunderWrapper = /*#__PURE__*/exports.popunderWrapper = (0, _emotion.css)("flex:1;min-width:200px;");

var popunderContainer = /*#__PURE__*/exports.popunderContainer = (0, _emotion.css)();

var popunderContainerHidden = /*#__PURE__*/exports.popunderContainerHidden = (0, _emotion.css)("display:none;");
var tagInputWrapper = /*#__PURE__*/exports.tagInputWrapper = (0, _emotion.css)("position:relative;");
var tagInputWrapperNoSearch = /*#__PURE__*/exports.tagInputWrapperNoSearch = (0, _emotion.css)("flex:1;position:relative;min-width:200px;");

var tagInput = /*#__PURE__*/exports.tagInput = (0, _emotion.css)(_styles.typography.normal, ";border:none;background:transparent;padding:0.4em 0;margin-left:0.5em;margin-bottom:0.5em;margin-right:0.5em;width:100%;&:focus{outline:none;}");

var spinner = /*#__PURE__*/exports.spinner = (0, _emotion.css)("position:absolute;right:1rem;top:0.9rem;z-index:2;");

var removeButton = /*#__PURE__*/exports.removeButton = (0, _emotion.css)("display:inline-block;margin-left:0.4em;&:focus,&:hover{color:", _styles.colours.values.error, ";}");