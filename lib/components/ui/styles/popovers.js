'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popover = undefined;

var _emotion = require('emotion');

var _colours = require('./colours');

var colours = _interopRequireWildcard(_colours);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var popover = /*#__PURE__*/exports.popover = (0, _emotion.css)(colours.whiteBackground, ';', colours.greyLightBorder, ';border-style:solid;border-width:1px;box-shadow:0 5px 10px rgba(0,0,0,.12),inset 0px 2px 0px 0px rgba(20,15,10,0.06);');