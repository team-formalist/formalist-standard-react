'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _text = require('./text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, { field: field, fieldProps: fieldProps });
  };
}

/**
 * Wrapped fields for each type
 * @type {Object}
 */

// import array from './array'
// import assets from './assets'
// import boolean from './boolean'
// import content from './content'
// import dateTime from './dateTime'
// import float from './float'
// import integer from './integer'
var fields = {
  text: wrapField(_text2.default)
};

exports.default = fields;