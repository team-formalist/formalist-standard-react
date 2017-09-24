'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.buttonHighlight = exports.buttonSecondary = exports.button = undefined;

var _emotion = require('emotion');

var _colours = require('./colours');

var colours = _interopRequireWildcard(_colours);

var _typography = require('./typography');

var typography = _interopRequireWildcard(_typography);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var button = /*#__PURE__*/exports.button = (0, _emotion.css)([typography.sans], [], function createEmotionStyledRules() {
  return [{
    'WebkitAppearance': 'none',
    'MozAppearance': 'none',
    'appearance': 'none',
    'cursor': 'pointer'
  }];
});

var buttonSecondary = /*#__PURE__*/exports.buttonSecondary = (0, _emotion.css)([button, colours.highlightLightBackground, colours.highlightColor], [colours.error, colours.white], function createEmotionStyledRules(x0, x1) {
  return [{
    '& :hover': {
      'backgroundColor': x0,
      'color': x1
    }
  }];
});

var buttonHighlight = /*#__PURE__*/exports.buttonHighlight = (0, _emotion.css)([button, colours.whiteColor, colours.highlightBackground], [colours.error], function createEmotionStyledRules(x0) {
  return [{
    '&:hover': {
      'backgroundColor': x0
    }
  }];
});

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)([typography.xsmall], [], function createEmotionStyledRules() {
  return [{
    'borderRadius': '0.2rem',
    'padding': '0.2em 0.4em 0.3em'
  }];
});

var small = /*#__PURE__*/exports.small = (0, _emotion.css)([typography.small], [], function createEmotionStyledRules() {
  return [{
    'borderRadius': '0.3rem',
    'padding': '0.4em 0.6em 0.5em'
  }];
});

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)([typography.normal], [], function createEmotionStyledRules() {
  return [{
    'borderRadius': '0.3rem',
    'padding': '0.4em 0.8em 0.7em'
  }];
});

var large = /*#__PURE__*/exports.large = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'borderRadius': '0.4rem',
    'padding': '0.8em 1em'
  }];
});

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)([], [], function createEmotionStyledRules() {
  return [{
    'borderRadius': '0.5rem',
    'padding': '1em 1.2em'
  }];
});