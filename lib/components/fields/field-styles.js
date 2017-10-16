'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require('emotion');

var base = /*#__PURE__*/exports.base = (0, _emotion.css)('margin-bottom:1.6em;');

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)('display:flex;');

var header = /*#__PURE__*/exports.header = (0, _emotion.css)('.', baseInline, ' &{flex:1;padding-top:1rem;padding-right:1rem;text-align:right;}');

var display = /*#__PURE__*/exports.display = (0, _emotion.css)('.', baseInline, ' &{flex:2;}');