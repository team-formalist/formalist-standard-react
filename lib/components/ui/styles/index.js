"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typography = exports.colours = exports.breakpoints = undefined;

var _breakpoints = require("./breakpoints");

var stylesBreakpoints = _interopRequireWildcard(_breakpoints);

var _colours = require("./colours");

var stylesColours = _interopRequireWildcard(_colours);

var _typography = require("./typography");

var stylesTypography = _interopRequireWildcard(_typography);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var breakpoints = exports.breakpoints = stylesBreakpoints;
var colours = exports.colours = stylesColours;
var typography = exports.typography = stylesTypography;