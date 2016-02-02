'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    var _props = this.props;
    var config = _props.config;
    var name = _props.name;
    var className = _props.className;

    return _react2.default.createElement(_textBox2.default, { id: name, className: className, defaultValue: this.props.value, placeholder: config.placeholder, onChange: this.props.onChange });
  }
});

// Components

exports.default = StringDisplayDefault;