'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Components

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatDisplayDefault = _react2.default.createClass({
  displayName: 'FloatDisplayDefault',

  propTypes: {
    value: _react2.default.PropTypes.number,
    config: _react2.default.PropTypes.object
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var config = _props.config;
    var name = _props.name;

    // Configure specific number attributes from the config

    var numberProps = {};
    var numberConfig = ['step', 'min', 'max'];
    numberConfig.forEach(function (option) {
      var value = config[option];
      if (value && (value === 'any' || (0, _isNumber2.default)(value))) {
        numberProps[option] = value;
      }
    });

    return _react2.default.createElement(_input2.default, _extends({
      id: name,
      className: className,
      type: 'number',
      defaultValue: this.props.value,
      placeholder: config.placeholder,
      onChange: this.props.onChange
    }, numberProps));
  }
});

exports.default = FloatDisplayDefault;