'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _dateTimePicker = require('../../ui/date-time-picker');

var _dateTimePicker2 = _interopRequireDefault(_dateTimePicker);

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
    var className = _props.className;
    var config = _props.config;
    var error = _props.error;
    var name = _props.name;
    var onChange = _props.onChange;
    var value = _props.value;

    return _react2.default.createElement(_dateTimePicker2.default, {
      id: name,
      className: className,
      error: error,
      placeholder: config.placeholder,
      defaultValue: value,
      onChange: onChange });
  }
});

// Components

exports.default = StringDisplayDefault;