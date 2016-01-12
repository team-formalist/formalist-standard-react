'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _isNumber = require('is-number');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _optionClassNames = require('../../../utils/option-class-names');

var _optionClassNames2 = _interopRequireDefault(_optionClassNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FloatDisplayDefault = _react2.default.createClass({
  displayName: 'FloatDisplayDefault',

  propTypes: {
    value: _react2.default.PropTypes.number,
    config: _react2.default.PropTypes.object
  },

  render: function render() {
    var config = this.props.config;

    var intFieldClassNames = (0, _classnames2.default)('fm-field-int', 'fm-input', 'fm-input--text', (0, _optionClassNames2.default)('fm-field-int', config.display_options));

    // Configure specific number attributes from the config
    var numberProps = {};
    var numberConfig = ['step', 'min', 'max'];
    numberConfig.forEach(function (option) {
      var value = config[option];
      if (value && (value === 'any' || (0, _isNumber2.default)(value))) {
        numberProps[option] = value;
      }
    });

    return _react2.default.createElement('input', _extends({ className: intFieldClassNames, type: 'number', defaultValue: this.props.value, onChange: this.props.onChange }, numberProps));
  }
});

exports.default = FloatDisplayDefault;
