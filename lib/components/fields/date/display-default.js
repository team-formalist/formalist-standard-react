'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _datePicker = require('../../ui/date-picker');

var _datePicker2 = _interopRequireDefault(_datePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplayDefault = _react2.default.createClass({
  displayName: 'StringDisplayDefault',

  propTypes: {
    value: _react2.default.PropTypes.string,
    error: _react2.default.PropTypes.bool,
    config: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var error = _props.error;
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;

    return _react2.default.createElement(_datePicker2.default, {
      id: name,
      error: error,
      placeholder: config.placeholder,
      defaultValue: value,
      onChange: onChange });
  }
});

// Components

exports.default = StringDisplayDefault;