'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import array from './array'
// import assets from './assets'
// import content from './content'
// import dateTime from './dateTime'

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayVariants = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _bool = require('./bool');

var _bool2 = _interopRequireDefault(_bool);

var _decimal = require('./decimal');

var _decimal2 = _interopRequireDefault(_decimal);

var _float = require('./float');

var _float2 = _interopRequireDefault(_float);

var _int = require('./int');

var _int2 = _interopRequireDefault(_int);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  var displayVariants = options.displayVariants;

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, displayVariants: displayVariants }, fieldProps));
  };
}

var displayVariants = exports.displayVariants = {
  bool: _bool.displayVariants,
  int: _int.displayVariants,
  decimal: _decimal.displayVariants,
  float: _float.displayVariants,
  string: _string.displayVariants
};

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    bool: wrapField(_bool2.default, options.bool),
    int: wrapField(_int2.default, options.int),
    decimal: wrapField(_decimal2.default, options.decimal),
    float: wrapField(_float2.default, options.float),
    string: wrapField(_string2.default, options.string)
  };
}

exports.default = fields;