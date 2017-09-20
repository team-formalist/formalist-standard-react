'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emotion = require('emotion');

var base = /*#__PURE__*/(0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'marginBottom': '5rem'
  }];
});

var label = /*#__PURE__*/(0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'borderBottom': '3px solid #36c',
    'marginBottom': '1.8rem',
    'paddingBottom': '1.8rem'
  }];
});

exports.default = {
  base: base,
  label: label
};