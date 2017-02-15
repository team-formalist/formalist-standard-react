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

var _richTextArea = require('./rich-text-area');

var _richTextArea2 = _interopRequireDefault(_richTextArea);

var _searchSelectionField = require('./search-selection-field');

var _searchSelectionField2 = _interopRequireDefault(_searchSelectionField);

var _searchMultiSelectionField = require('./search-multi-selection-field');

var _searchMultiSelectionField2 = _interopRequireDefault(_searchMultiSelectionField);

var _selectBox = require('./select-box');

var _selectBox2 = _interopRequireDefault(_selectBox);

var _selectionField = require('./selection-field');

var _selectionField2 = _interopRequireDefault(_selectionField);

var _tagsField = require('./tags-field');

var _tagsField2 = _interopRequireDefault(_tagsField);

var _textArea = require('./text-area');

var _textArea2 = _interopRequireDefault(_textArea);

var _textField = require('./text-field');

var _textField2 = _interopRequireDefault(_textField);

var _multiUploadField = require('./multi-upload-field');

var _multiUploadField2 = _interopRequireDefault(_multiUploadField);

var _uploadField = require('./upload-field');

var _uploadField2 = _interopRequireDefault(_uploadField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Wrap a React class in with the common Container class
 *
 * @param  {Function} field A React class
 * @return {Function} A function
 */
function wrapField(field) {
  var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var globalConfig = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return function (fieldProps) {
    return _react2.default.createElement(_container2.default, _extends({ field: field, config: config, globalConfig: globalConfig }, fieldProps));
  };
}

/**
 * Wrapped fields for each type
 * @param {Object} config Config specific to the fields.
 * @type {Object}
 */
function fields() {
  var fieldsConfig = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var globalConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    checkBox: wrapField(_checkBox2.default, fieldsConfig.checkBox, globalConfig),
    dateField: wrapField(_dateField2.default, fieldsConfig.dateField, globalConfig),
    dateTimeField: wrapField(_dateTimeField2.default, fieldsConfig.dateTimeField, globalConfig),
    hiddenField: wrapField(_hiddenField2.default, fieldsConfig.hiddenField, globalConfig),
    multiSelectionField: wrapField(_multiSelectionField2.default, fieldsConfig.multiSelectionField, globalConfig),
    numberField: wrapField(_numberField2.default, fieldsConfig.numberField, globalConfig),
    radioButtons: wrapField(_radioButtons2.default, fieldsConfig.radioButtons, globalConfig),
    richTextArea: wrapField(_richTextArea2.default, fieldsConfig.richTextArea, globalConfig),
    searchSelectionField: wrapField(_searchSelectionField2.default, fieldsConfig.searchSelectionField, globalConfig),
    searchMultiSelectionField: wrapField(_searchMultiSelectionField2.default, fieldsConfig.searchMultiSelectionField, globalConfig),
    selectBox: wrapField(_selectBox2.default, fieldsConfig.selectBox, globalConfig),
    selectionField: wrapField(_selectionField2.default, fieldsConfig.selectionField, globalConfig),
    tagsField: wrapField(_tagsField2.default, fieldsConfig.tagsField, globalConfig),
    textArea: wrapField(_textArea2.default, fieldsConfig.textArea, globalConfig),
    textField: wrapField(_textField2.default, fieldsConfig.textField, globalConfig),
    multiUploadField: wrapField(_multiUploadField2.default, fieldsConfig.multiUploadField, globalConfig),
    uploadField: wrapField(_uploadField2.default, fieldsConfig.uploadField, globalConfig)
  };
}

exports.default = fields;