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
    className: _react2.default.PropTypes.string,
    config: _react2.default.PropTypes.object,
    error: _react2.default.PropTypes.bool,
    name: _react2.default.PropTypes.string.isRequired,
    onChange: _react2.default.PropTypes.func.isRequired,
    value: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number])
  },

  render: function render() {
    var _props = this.props;
    var config = _props.config;
    var error = _props.error;
    var name = _props.name;
    var className = _props.className;
    var onChange = _props.onChange;
    var value = _props.value;
    var placeholder = config.placeholder;
    var box_size = config.box_size;


    return _react2.default.createElement(_textBox2.default, {
      id: name,
      className: className,
      error: error,
      defaultValue: value,
      placeholder: placeholder,
      boxSize: box_size,
      onChange: onChange
    });
  }
});

// Components


exports.default = StringDisplayDefault;