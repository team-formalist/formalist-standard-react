"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require("emotion");

var _fieldStyles = require("../field-styles");

var fields = _interopRequireWildcard(_fieldStyles);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)("composes:", fields.base, ";");

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)("composes:", fields.baseInline, ";");

var header = /*#__PURE__*/exports.header = (0, _emotion.css)("composes:", fields.header, ";.", baseInline, " &{padding-top:0;}");