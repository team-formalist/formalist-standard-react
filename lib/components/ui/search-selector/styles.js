"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noResults = exports.optionButtonSelected = exports.optionButton = exports.pagination = exports.resultsLoading = exports.results = exports.spinner = exports.search = exports.list = exports.base = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("min-width:40rem;position:relative;");

var list = /*#__PURE__*/exports.list = (0, _emotion.css)("max-height:60rem;overflow-y:scroll;overflow-scroll:touch;");

var search = /*#__PURE__*/exports.search = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";appearance:none;box-sizing:border-box;border:none;box-shadow:0 2px 0 0 rgba(0,0,0,0.02);padding:0.5em 0.5em 0.7em 0.5em;position:relative;width:100%;z-index:1;&:focus{outline:none;}");

var spinner = /*#__PURE__*/exports.spinner = (0, _emotion.css)("position:absolute;right:1rem;top:0.9rem;z-index:2;");

var results = /*#__PURE__*/exports.results = (0, _emotion.css)("opacity:1;transition-duration:100ms;transition-property:opacity;");

var resultsLoading = /*#__PURE__*/exports.resultsLoading = (0, _emotion.css)("opacity:0.5;position:relative;&:before{bottom:0;content:'';left:0;pointer-events:all;position:absolute;right:0;top:0;background-color:transparent;z-index:100;}");

var pagination = /*#__PURE__*/exports.pagination = (0, _emotion.css)(_styles.typography.normal, ";", _styles.typography.sans, ";", _styles.colours.greyTintBorder, ";box-shadow:0 3px 0 0 rgba(0,0,0,0.05);border-width:0;border-top-width:1px;border-top-style:solid;position:relative;z-index:1;");

var optionButton = /*#__PURE__*/exports.optionButton = (0, _emotion.css)(_styles.typography.small, ";", _styles.typography.sans, ";", _styles.colours.greyTintBorder, ";", _styles.colours.whiteBackground, ";border-width:0;border-bottom-width:1px;border-top-width:1px;border-style:solid;cursor:pointer;display:block;padding:0.7rem 1rem;margin-bottom:-1px;text-align:left;width:100%;&:hover{text-decoration:underline;}");

var optionButtonSelected = /*#__PURE__*/exports.optionButtonSelected = (0, _emotion.css)(_styles.colours.highlightLightBackground, ";", _styles.colours.highlightDarkColor, ";border-color:color(#7fc2ea tint(40%));position:relative;z-index:1;");

var noResults = /*#__PURE__*/exports.noResults = (0, _emotion.css)("text-align:center;padding:2rem;");