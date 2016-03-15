'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _checkBox = require('./check-box');

var _checkBox2 = _interopRequireDefault(_checkBox);

var _dateField = require('./date-field');

var _dateField2 = _interopRequireDefault(_dateField);

var _dateTimeField = require('./date-time-field');

var _dateTimeField2 = _interopRequireDefault(_dateTimeField);

var _numberField = require('./number-field');

var _numberField2 = _interopRequireDefault(_numberField);

var _radioButtons = require('./radio-buttons');

var _radioButtons2 = _interopRequireDefault(_radioButtons);

var _selectBox = require('./select-box');

var _selectBox2 = _interopRequireDefault(_selectBox);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _textArea = require('./text-area');

var _textArea2 = _interopRequireDefault(_textArea);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, options: options }, fieldProps));
  };
}

/**
 * Wrapped fields for each type
 * @param {Object} options Options specific to the fields.
 * @type {Object}
 */
function fields() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    checkBox: wrapField(_checkBox2.default, options.checkBox),
    dateField: wrapField(_dateField2.default, options.dateField),
    dateTimeField: wrapField(_dateTimeField2.default, options.dateTimeField),
    numberField: wrapField(_numberField2.default, options.numberField),
    radioButtons: wrapField(_radioButtons2.default, options.radioButtons),
    selectBox: wrapField(_selectBox2.default, options.selectBox),
    textArea: wrapField(_textArea2.default, options.textArea),
    textField: wrapField(_textField2.default, options.textField)
  };
}

exports.default = fields;