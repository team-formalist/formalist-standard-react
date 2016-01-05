'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TextFieldStandard = _react2.default.createClass({
  displayName: 'TextFieldStandard',

  propTypes: {
    value: _react2.default.PropTypes.string
  },

  render: function render() {
    _react2.default.createElement('input', { type: 'text', defaultValue: this.props.value, onChange: this.props.onChange });
  }
});

exports.default = TextFieldStandard;