"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeX = exports.removeText = exports.editButton = exports.saveButton = exports.actions = exports.label = exports.fieldCheckbox = exports.field = exports.handlerUrl = exports.displayWrapper = undefined;

var _emotion = require("emotion");

var _styles = require("../../../../styles");

var displayWrapper = /*#__PURE__*/exports.displayWrapper = (0, _emotion.css)("display:flex;");

var handlerUrl = /*#__PURE__*/exports.handlerUrl = (0, _emotion.css)(_styles.typography.mono, ";", _styles.colours.primaryColor, ";max-width:25rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-decoration:none;&:hover{color:", _styles.colours.values.error, ";text-decoration:underline;}");

var field = /*#__PURE__*/exports.field = (0, _emotion.css)("display:flex;align-items:center;min-width:35rem;margin-bottom:0.5rem;");

var fieldCheckbox = /*#__PURE__*/exports.fieldCheckbox = (0, _emotion.css)("margin-left:4rem;margin-top:0.5rem;margin-bottom:0.5rem;");

var label = /*#__PURE__*/exports.label = (0, _emotion.css)(_styles.typography.small, ";text-align:right;padding-right:1rem;width:4rem;");

var actions = /*#__PURE__*/exports.actions = (0, _emotion.css)("margin-top:0.8rem;margin-bottom:0.5rem;margin-left:4rem;");

var saveButton = /*#__PURE__*/exports.saveButton = (0, _emotion.css)(_styles.buttons.small, ";", _styles.buttons.buttonHighlight, ";");

var editButton = /*#__PURE__*/exports.editButton = (0, _emotion.css)(_styles.colours.highlightColor, ";margin-left:1.2rem;margin-right:0.8rem;text-decoration:underline;&:hover,&:focus{color:", _styles.colours.values.error, ";}");
var removeText = /*#__PURE__*/exports.removeText = (0, _emotion.css)("display:none;");

var removeX = /*#__PURE__*/exports.removeX = (0, _emotion.css)(_styles.colours.errorColor, ";", _styles.typography.fallback, ";", _styles.typography.large, ";display:inline-block;line-height:1rem;&:hover{color:", _styles.colours.values.primary, ";}");