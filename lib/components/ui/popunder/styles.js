"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.container = undefined;

var _emotion = require("emotion");

var _styles = require("../styles");

var container = /*#__PURE__*/exports.container = (0, _emotion.css)("composes:", _styles.typography.normal, " ", _styles.typography.sans, " ", _styles.colours.whiteBackground, " ", _styles.typography.popover, ";border-bottom-left-radius:3px;border-bottom-right-radius:3px;max-height:20rem;max-width:20rem;min-width:14rem;overflow-y:scroll;overflow-scroll:touch;position:absolute;z-index:10000;");