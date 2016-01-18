'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayVariants = undefined;

var _float = require('../float');

var _float2 = _interopRequireDefault(_float);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Decimal fields are the same as floats as far as JavaScript is concerned
 */
exports.default = _float2.default;
var displayVariants = exports.displayVariants = _float.displayVariants;