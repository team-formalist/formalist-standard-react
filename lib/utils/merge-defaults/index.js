'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash.assigninwith');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.partialright');

var _lodash4 = _interopRequireDefault(_lodash3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Customizer function for assignInWith
 * @param  {Mixed} objectValue Value from the object
 * @param  {Mixed} sourceValue Value from the source
 * @return {Mixed} Whichever of the above values is defined
 */
function assignIfDefined(objectValue, sourceValue) {
  return objectValue == null ? sourceValue : objectValue;
}

/**
 * Curry lodash’s assignInWith with a customizer function that only overrites
 * object values if they are defined.
 * @type {Function}
 */
exports.default = (0, _lodash4.default)(_lodash2.default, assignIfDefined);