'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _input = require('../../ui/input');

var _input2 = _interopRequireDefault(_input);

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
    var onChange = _props.onChange;
    var name = _props.name;
    var value = _props.value;
    var className = _props.className;

    var type = config.password ? 'password' : 'text';

    return _react2.default.createElement(_input2.default, {
      type: type,
      id: name,
      error: error,
      className: className,
      placeholder: config.placeholder,
      defaultValue: value,
      onChange: onChange });
  }
});

// Components


exports.default = StringDisplayDefault;