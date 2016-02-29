'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Components


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numberIsInteger = require('number-is-integer');

var _numberIsInteger2 = _interopRequireDefault(_numberIsInteger);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IntDisplayDefault = _react2.default.createClass({
  displayName: 'IntDisplayDefault',

  propTypes: {
    className: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    error: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.number
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var config = _props.config;
    var error = _props.error;
    var name = _props.name;

    // Configure specific number attributes from the config

    var numberProps = {};
    var numberConfig = ['step', 'min', 'max'];
    numberConfig.forEach(function (option) {
      var value = config[option];
      if (value && (0, _numberIsInteger2.default)(value)) {
        numberProps[option] = value;
      }
    });

    return _react2.default.createElement(_input2.default, _extends({
      id: name,
      className: className,
      error: error,
      type: 'number',
      defaultValue: this.props.value,
      placeholder: config.placeholder,
      onChange: this.props.onChange
    }, numberProps));
  }
});

exports.default = IntDisplayDefault;