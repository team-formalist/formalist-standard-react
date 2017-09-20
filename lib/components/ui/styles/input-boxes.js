'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.inputBox = undefined;

var _emotion = require('emotion');

var _colours = require('./colours');

var _colours2 = _interopRequireDefault(_colours);

var _typography = require('./typography');

var _typography2 = _interopRequireDefault(_typography);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var inputBox = /*#__PURE__*/exports.inputBox = (0, _emotion.css)([_typography2.default.sans, _typography2.default.sizes.normal, _colours2.default.primaryColor, _colours2.default.greyLightBorder, _colours2.default.greyTintBackground], [], function createEmotionStyledRules() {
  return [{
    'WebkitBoxShadow': 'inset 0px 2px 0px 0px rgba(20,15,10,0.03)',
    'boxShadow': 'inset 0px 2px 0px 0px rgba(20,15,10,0.03)',
    'borderWidth': '0',
    'borderTopWidth': '1px',
    'borderTopStyle': 'solid',
    'borderRadius': '0',
    'WebkitBoxSizing': 'border-box',
    'boxSizing': 'border-box',
    'padding': '0.6em 0.7em 0.8em',
    'width': '100%',
    'WebkitTransitionProperty': 'border-color, background-color',
    'transitionProperty': 'border-color, background-color',
    'WebkitTransitionDuration': '100ms',
    'transitionDuration': '100ms'
  }];
});

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)([_colours2.default.errorColor, _colours2.default.errorBorder, _colours2.default.errorLightBackground], [], function createEmotionStyledRules() {
  return [{
    '&::-webkit-input-placeholder': {
      'color': 'rgba(0,0,0,0.2)'
    },
    '&:-ms-input-placeholder': {
      'color': 'rgba(0,0,0,0.2)'
    },
    '&::placeholder': {
      'color': 'rgba(0,0,0,0.2)'
    }
  }];
});

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)([_colours2.default.darkBlendColor, _colours2.default.highlightBorder, _colours2.default.highlightLightBackground], [_colours2.default.lightBlend], function createEmotionStyledRules(x0) {
  return [{
    'outline': 'none',
    '&::-webkit-input-placeholder': {
      'color': x0
    },
    '&:-ms-input-placeholder': {
      'color': x0
    },
    '&::placeholder': {
      'color': x0
    }
  }];
});

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)([_typography2.default.sizes.xSmall], [], function createEmotionStyledRules() {
  return [{}];
});

var small = /*#__PURE__*/exports.small = (0, _emotion.css)([_typography2.default.sizes.small], [], function createEmotionStyledRules() {
  return [{}];
});

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)([_typography2.default.sizes.normal], [], function createEmotionStyledRules() {
  return [{}];
});

var large = /*#__PURE__*/exports.large = (0, _emotion.css)([_typography2.default.sizes.large], [], function createEmotionStyledRules() {
  return [{}];
});

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)([_typography2.default.sizes.xLarge], [], function createEmotionStyledRules() {
  return [{}];
});