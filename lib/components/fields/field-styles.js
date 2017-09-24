'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.display = exports.header = exports.baseInline = exports.base = undefined;

var _emotion = require('emotion');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var base = /*#__PURE__*/exports.base = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'marginBottom': '1.6em'
  }];
});

var baseInline = /*#__PURE__*/exports.baseInline = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'display': '-webkit-box; display: -ms-flexbox; display: flex'
  }];
});

var header = /*#__PURE__*/exports.header = (0, _emotion.css)([], [baseInline], function createEmotionStyledRules(x0) {
  return [_defineProperty({}, '.' + x0 + ' &', {
    'WebkitBoxFlex': '1',
    'msFlex': '1',
    'flex': '1',
    'paddingTop': '1rem',
    'paddingRight': '1rem',
    'textAlign': 'right'
  })];
});

var display = /*#__PURE__*/exports.display = (0, _emotion.css)([], [baseInline], function createEmotionStyledRules(x0) {
  return [_defineProperty({}, '.' + x0 + ' &', {
    'WebkitBoxFlex': '2',
    'msFlex': '2',
    'flex': '2'
  })];
});