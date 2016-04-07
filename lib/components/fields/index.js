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

var _hiddenField = require('./hidden-field');

var _hiddenField2 = _interopRequireDefault(_hiddenField);

var _multiSelectionField = require('./multi-selection-field');

var _multiSelectionField2 = _interopRequireDefault(_multiSelectionField);

var _numberField = require('./number-field');

var _numberField2 = _interopRequireDefault(_numberField);

var _radioButtons = require('./radio-buttons');

var _radioButtons2 = _interopRequireDefault(_radioButtons);

var _selectBox = require('./select-box');

var _selectBox2 = _interopRequireDefault(_selectBox);

var _selectionField = require('./selection-field');

var _selectionField2 = _interopRequireDefault(_selectionField);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _textArea = require('./text-area');

var _textArea2 = _interopRequireDefault(_textArea);

var _multiUploadField = require('./multi-upload-field');

var _multiUploadField2 = _interopRequireDefault(_multiUploadField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, config: config }, fieldProps));
  };
}

/**
 * Wrapped fields for each type
 * @param {Object} config Config specific to the fields.
 * @type {Object}
 */
function fields() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  return {
    checkBox: wrapField(_checkBox2.default, config.checkBox),
    dateField: wrapField(_dateField2.default, config.dateField),
    dateTimeField: wrapField(_dateTimeField2.default, config.dateTimeField),
    hiddenField: wrapField(_hiddenField2.default, config.hiddenField),
    multiSelectionField: wrapField(_multiSelectionField2.default, config.multiSelectionField),
    numberField: wrapField(_numberField2.default, config.numberField),
    radioButtons: wrapField(_radioButtons2.default, config.radioButtons),
    selectBox: wrapField(_selectBox2.default, config.selectBox),
    selectionField: wrapField(_selectionField2.default, config.selectionField),
    textArea: wrapField(_textArea2.default, config.textArea),
    textField: wrapField(_textField2.default, config.textField),
    multiUploadField: wrapField(_multiUploadField2.default, config.multiUploadField)
  };
}

exports.default = fields;