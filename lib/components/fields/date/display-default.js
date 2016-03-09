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
    className: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    error: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var config = _props.config;
    var error = _props.error;
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;
    var placeholder = config.placeholder;


    return _react2.default.createElement(_datePicker2.default, {
      id: name,
      className: className,
      error: error,
      placeholder: placeholder,
      defaultValue: value,
      onChange: onChange
    });
  }
});

// Components


exports.default = StringDisplayDefault;