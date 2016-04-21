'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _multiUploadField = require('../multi-upload-field');

var _multiUploadField2 = _interopRequireDefault(_multiUploadField);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UploadField
 * Create a 'single-file' version of the multi-upload-field
 * Defaults 'multiple' to false
 */

var UploadField = _react2.default.createClass({
  displayName: 'UploadField',
  render: function render() {
    return _react2.default.createElement(_multiUploadField2.default, _extends({}, this.props, { multiple: false }));
  }
});

exports.default = UploadField;