'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _optionClassNames = require('../../../utils/option-class-names');

var _optionClassNames2 = _interopRequireDefault(_optionClassNames);

var _textBox = require('../../ui/text-box');

var _textBox2 = _interopRequireDefault(_textBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StringDisplayDefault = _react2.default.createClass({
  displayName: 'StringDisplayDefault',

  propTypes: {
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number]),
    config: _react2.default.PropTypes.object,
    onChange: _react2.default.PropTypes.func.isRequired
  },

  render: function render() {
    var config = this.props.config;

    var stringFieldClassNames = (0, _classnames2.default)('fm-field-string', 'fm-input', 'fm-input--text', (0, _optionClassNames2.default)('fm-field-string', config.display_options));

    return _react2.default.createElement(_textBox2.default, { className: stringFieldClassNames, defaultValue: this.props.value, placeholder: config.placeholder, onChange: this.props.onChange });
  }
});

// Components

exports.default = StringDisplayDefault;