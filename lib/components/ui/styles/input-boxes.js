'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.xlarge = exports.large = exports.normal = exports.small = exports.xsmall = exports.focus = exports.error = exports.inputBox = undefined;

var _emotion = require('emotion');

var _colours = require('./colours');

var colours = _interopRequireWildcard(_colours);

var _typography = require('./typography');

var typography = _interopRequireWildcard(_typography);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var inputBox = /*#__PURE__*/exports.inputBox = (0, _emotion.css)(typography.sans, ';', typography.normal, ';', colours.primaryColor, ';', colours.greyLightBorder, ';', colours.greyTintBackground, ';box-shadow:inset 0px 2px 0px 0px rgba(20,15,10,0.03);border-width:0;border-top-width:1px;border-top-style:solid;border-radius:0;box-sizing:border-box;padding:0.6em 0.7em 0.8em;width:100%;transition-property:border-color,background-color;transition-duration:100ms;');

/* States */

var error = /*#__PURE__*/exports.error = (0, _emotion.css)(colours.errorColor, ';', colours.errorBorder, ';', colours.errorLightBackground, ';&::placeholder{color:rgba(0,0,0,0.2);}');

var focus = /*#__PURE__*/exports.focus = (0, _emotion.css)(colours.darkBlendColor, ';', colours.highlightBorder, ';', colours.highlightLightBackground, ';outline:none;&::placeholder{color:', colours.lightBlend, ';}');

/* Sizes */

var xsmall = /*#__PURE__*/exports.xsmall = (0, _emotion.css)(typography.xSmall, ';');

var small = /*#__PURE__*/exports.small = (0, _emotion.css)(typography.small, ';');

var normal = /*#__PURE__*/exports.normal = (0, _emotion.css)(typography.normal, ';');

var large = /*#__PURE__*/exports.large = (0, _emotion.css)(typography.large, ';');

var xlarge = /*#__PURE__*/exports.xlarge = (0, _emotion.css)(typography.xLarge, ';');