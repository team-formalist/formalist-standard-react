"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selection = exports.optionButton = exports.search = exports.noResults = exports.optionsList = exports.options = exports.openSelectorButton = exports.selectionPlaceholder = exports.selectionItems = exports.wrapper = exports.display = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

var _styles = require("../../ui/styles");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)(fields.base, ";");

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)(fields.baseInline, ";");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)(fields.header, ";");

var display = /*#__PURE__*/exports.display = (0, _emotion.css)(_styles.inputBoxes.inputBox, ";");

var wrapper = /*#__PURE__*/exports.wrapper = (0, _emotion.css)("align-items:center;display:flex;padding:0;width:100%;&:focus{outline:none;}");

var selectionItems = /*#__PURE__*/exports.selectionItems = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";margin-top:1px;");

var selectionPlaceholder = /*#__PURE__*/exports.selectionPlaceholder = (0, _emotion.css)(_styles.colours.greyMidColor, ";", _styles.typography.normal, ";", _styles.typography.sans, ";align-items:center;display:flex;flex:1;text-align:left;min-height:2rem;");

var openSelectorButton = /*#__PURE__*/exports.openSelectorButton = (0, _emotion.css)(_styles.buttons.small, ";", _styles.buttons.buttonHighlight, ";margin-right:-0.3rem;margin-top:-0.2rem;margin-bottom:-0.4rem;");

/**
 * Selections
 */

var options = /*#__PURE__*/exports.options = (0, _emotion.css)("min-width:30rem;");

var optionsList = /*#__PURE__*/exports.optionsList = (0, _emotion.css)("max-height:40rem;overflow-y:scroll;overflow-scroll:touch;padding-top:0.5rem;");

var noResults = /*#__PURE__*/exports.noResults = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";padding:0.5em 1rem 0.7em;");

var search = /*#__PURE__*/exports.search = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";", _styles.colours.greyTintBorder, ";appearance:none;border-width:0;border-bottom-width:1px;border-bottom-style:solid;box-sizing:border-box;box-shadow:0 2px 0 0 rgba(0,0,0,0.02);padding:0.5em 0.5em 0.7em 0.5em;position:relative;width:100%;z-index:1;&:focus{outline:none;}");

var optionButton = /*#__PURE__*/exports.optionButton = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";", _styles.colours.greyTintBorder, ";", _styles.colours.whiteBackground, ";border-width:0;border-bottom-width:1px;border-style:solid;cursor:pointer;display:block;padding:0.7rem 1rem;text-align:left;width:100%;&:hover{text-decoration:underline;}strong{font-weight:", _styles.typography.fonts.weights.sansBold, ";}italic{font-style:italic;}");

var selection = /*#__PURE__*/exports.selection = (0, _emotion.css)("strong{font-weight:", _styles.typography.fonts.weights.sansBold, ";}italic{font-style:italic;}");