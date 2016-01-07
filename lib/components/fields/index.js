'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import array from './array'
// import assets from './assets'
// import content from './content'
// import dateTime from './dateTime'

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field }, fieldProps));
  };
}

/**
 * Wrapped fields for each type
 * @type {Object}
 */
var fields = {
  bool: wrapField(_bool2.default),
  int: wrapField(_int2.default),
  decimal: wrapField(_decimal2.default),
  float: wrapField(_float2.default),
  string: wrapField(_string2.default)
};

exports.default = fields;