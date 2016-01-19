'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _label = require('./label.mcss');

var _label2 = _interopRequireDefault(_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Label = _react2.default.createClass({
  displayName: 'Label',

  propTypes: {
    className: _react2.default.PropTypes.string
  },
  render: function render() {
    var textBoxClassNames = (0, _classnames2.default)(this.props.className, _label2.default.base);
    return _react2.default.createElement('label', _extends({}, this.props, { className: textBoxClassNames }));
  }
});

exports.default = Label;