"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentPlaceholderHeaderOne = exports.contentPlaceholderOrderedListItem = exports.contentPlaceholderUnorderedListItem = exports.content = exports.gutter = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)(_styles.inputBoxes.inputBox, ";display:flex;padding:0;");

var gutter = /*#__PURE__*/exports.gutter = (0, _emotion.css)("border-right:1px solid ", _styles.colours.values.greyLight, ";position:relative;width:5rem;");

var content = /*#__PURE__*/exports.content = (0, _emotion.css)("padding:2rem 2rem 1rem;flex:1;");

var contentPlaceholderUnorderedListItem = /*#__PURE__*/exports.contentPlaceholderUnorderedListItem = (0, _emotion.css)();
var contentPlaceholderOrderedListItem = /*#__PURE__*/exports.contentPlaceholderOrderedListItem = (0, _emotion.css)();
var contentPlaceholderHeaderOne = /*#__PURE__*/exports.contentPlaceholderHeaderOne = (0, _emotion.css)();

(0, _emotion.injectGlobal)(".public-DraftEditorPlaceholder-root{.", contentPlaceholderUnorderedListItem, " &,.", contentPlaceholderOrderedListItem, " &{margin-left:1.5rem;}.", contentPlaceholderHeaderOne, " &{margin-left:0.2rem;}}");